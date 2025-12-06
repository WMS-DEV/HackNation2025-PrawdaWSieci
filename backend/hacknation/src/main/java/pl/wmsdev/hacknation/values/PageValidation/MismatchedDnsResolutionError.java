package pl.wmsdev.hacknation.values.PageValidation;

public record MismatchedDnsResolutionError(String clientIp, String verifierIp) implements PageValidationError {
    @Override
    public String getDescription() {
        return String.format("DNS resolution check failed. IP address does not match. Client got: %s but the verifier got: %s", clientIp, verifierIp);
    }
}
