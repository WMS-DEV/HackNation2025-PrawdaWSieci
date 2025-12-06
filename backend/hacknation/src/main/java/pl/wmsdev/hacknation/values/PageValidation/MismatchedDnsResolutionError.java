package pl.wmsdev.hacknation.values.PageValidation;

public final class MismatchedDnsResolutionError extends PageValidationError {
    private final String clientIp;
    private final String verifierIp;

    public MismatchedDnsResolutionError(String clientIp, String verifierIp) {
        this.clientIp = clientIp;
        this.verifierIp = verifierIp;
    }

    @Override
    public String getDescription() {
        return String.format("DNS resolution check failed. IP address does not match. Client got: %s but the verifier got: %s", clientIp, verifierIp);
    }
}
