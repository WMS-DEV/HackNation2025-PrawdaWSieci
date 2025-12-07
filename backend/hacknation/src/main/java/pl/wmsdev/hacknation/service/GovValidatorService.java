package pl.wmsdev.hacknation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.wmsdev.hacknation.entity.CheckResponse;
import pl.wmsdev.hacknation.entity.HashEntry;
import pl.wmsdev.hacknation.entity.PageData;
import pl.wmsdev.hacknation.repository.DomainRepository;
import pl.wmsdev.hacknation.repository.HashRepository;
import pl.wmsdev.hacknation.values.CheckResult;
import pl.wmsdev.hacknation.values.PageValidation.*;
import pl.wmsdev.hacknation.values.ValidationResult;

import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class GovValidatorService {
    private final HashRepository hashRepository;
    private final DomainRepository domainRepository;

    public CheckResponse validatePage(PageData pageData) {
        UUID validationId = UUID.randomUUID();

        Optional<PageValidationError> encounteredError = Optional.empty();
        try {
            var url = validateUrl(pageData.url());
            validateTld(url);
            var ipFromServer = resolveDns(url);
            validateIp(ipFromServer, pageData.serverIp());
            validateHttps(url);
            validateSsl(url);
        } catch (PageValidationError error) {
            encounteredError = Optional.of(error);
        }

        hashRepository.save(HashEntry.builder()
                .id(validationId)
                .originalUrl(pageData.url())
                .serverIp(pageData.serverIp())
                .timestamp(Instant.now())
                .result(encounteredError.isEmpty() ? CheckResult.VALID : CheckResult.INVALID)
                .build());

        return new CheckResponse(validationId);
    }

    private URL validateUrl(String url) throws MalformedUrlError {
        try {
            return new URL(url);
        } catch (MalformedURLException e) {
            throw new MalformedUrlError(e.getMessage());
        }
    }

    private void validateTld(URL url) throws FraudulentTldError {
        var host =  url.getHost();
        if (domainRepository.findByDomain(host).isEmpty()) {
            throw new FraudulentTldError();
        }
    }

    private void validateHttps(URL url) throws NoHttpsError {
       if (!url.getProtocol().equalsIgnoreCase("https")) {
           throw new NoHttpsError();
       }
    }

    private InetAddress resolveDns(URL url) throws DnsResolutionError {
        try {
            return InetAddress.getByName(url.getHost());
        } catch (UnknownHostException e) {
            throw new DnsResolutionError(e.getMessage());
        }
    }

    private void validateIp(InetAddress addressFromServer, String ipFromClient) throws MismatchedDnsResolutionError {
        if (!addressFromServer.getHostAddress().equals(ipFromClient)) {
            throw new MismatchedDnsResolutionError(ipFromClient, addressFromServer.getHostAddress());
        }
    }

    private void validateSsl(URL url) throws SslError {
        try {
            HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
            conn.setRequestMethod("HEAD");
            conn.connect();
            conn.disconnect();
        } catch (IOException e) {
            throw new SslError(e.getMessage());
        }
    }

    public ValidationResult getValidationResult(UUID validationId) {
        return hashRepository.findById(validationId)
                .map(hashEntry -> new ValidationResult(hashEntry.getResult()))
                .orElseThrow(() -> new RuntimeException("Validation result not found for ID: " + validationId));
    }
}
