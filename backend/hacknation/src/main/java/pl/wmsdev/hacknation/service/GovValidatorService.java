package pl.wmsdev.hacknation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wmsdev.hacknation.entity.CheckResponse;
import pl.wmsdev.hacknation.entity.HashEntry;
import pl.wmsdev.hacknation.entity.PageData;
import pl.wmsdev.hacknation.repository.HashRepository;
import pl.wmsdev.hacknation.values.CheckResult;
import pl.wmsdev.hacknation.values.PageValidation.*;

import javax.net.ssl.HttpsURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class GovValidatorService {

    private static final Pattern GOV_PL_PATTERN = Pattern.compile("^(?:[a-zA-Z0-9-]+\\.)*gov\\.pl$");
    private final HashRepository hashRepository;

    public CheckResponse validatePage(PageData pageData) {
        List<PageValidationError> errors = new ArrayList<>();
        boolean isValid = true;
        UUID validationId = UUID.randomUUID();

        try {
            URL url = new URL(pageData.url());

            if (!GOV_PL_PATTERN.matcher(url.getHost()).matches()) {
                isValid = false;
                errors.add(new FraudulentTldError());
            }

            try {
                InetAddress address = InetAddress.getByName(url.getHost());
                if (!address.getHostAddress().equals(pageData.serverIp())) {
                    isValid = false;
                    errors.add(new MismatchedDnsResolutionError(pageData.serverIp(), address.getHostAddress()));
                }
            } catch (Exception e) {
                isValid = false;
                errors.add(new DnsResolutionError(e.getMessage()));
            }

            if (url.getProtocol().equalsIgnoreCase("https")) {
                try {
                    HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
                    conn.setRequestMethod("HEAD");
                    conn.connect();
                    conn.disconnect();
                } catch (Exception e) {
                    isValid = false;
                    errors.add(new SslError(e.getMessage()));
                }
            } else {
                isValid = false;
                errors.add(new NoHttpsError());
            }

        } catch (Exception e) {
            isValid = false;
            errors.add(new MalformedUrlError(e.getMessage()));
        }

        hashRepository.save(HashEntry.builder()
                .id(validationId)
                .originalUrl(pageData.url())
                .serverIp(pageData.serverIp())
                .timestamp(pageData.timestamp())
                .result(isValid ? CheckResult.VALID : CheckResult.INVALID)
                .build());

        return new CheckResponse(validationId);
    }
}
