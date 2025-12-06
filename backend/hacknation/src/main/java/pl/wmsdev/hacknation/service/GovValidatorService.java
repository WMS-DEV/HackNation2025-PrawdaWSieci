package pl.wmsdev.hacknation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wmsdev.hacknation.entity.CheckResponse;
import pl.wmsdev.hacknation.entity.HashEntry;
import pl.wmsdev.hacknation.entity.PageData;
import pl.wmsdev.hacknation.repository.HashRepository;
import pl.wmsdev.hacknation.values.CheckResult;

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
        List<String> reasons = new ArrayList<>();
        boolean isValid = true;
        UUID validationId = UUID.randomUUID();

        try {
            URL url = new URL(pageData.url());

            if (!GOV_PL_PATTERN.matcher(url.getHost()).matches()) {
                isValid = false;
                reasons.add("Host is not a valid gov.pl domain.");
            }

            try {
                InetAddress address = InetAddress.getByName(url.getHost());
                if (!address.getHostAddress().equals(pageData.serverIp())) {
                    isValid = false;
                    reasons.add("DNS resolution check failed. IP address does not match. It should be: " + address.getHostAddress());
                }
            } catch (Exception e) {
                isValid = false;
                reasons.add("DNS resolution failed: " + e.getMessage());
            }

            if (url.getProtocol().equalsIgnoreCase("https")) {
                try {
                    HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
                    conn.setRequestMethod("HEAD");
                    conn.connect();
                    conn.disconnect();
                } catch (Exception e) {
                    isValid = false;
                    reasons.add("SSL certificate validation failed: " + e.getMessage());
                }
            } else {
                isValid = false;
                reasons.add("URL is not HTTPS.");
            }

        } catch (Exception e) {
            isValid = false;
            reasons.add("Invalid URL: " + e.getMessage());
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
