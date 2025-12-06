package pl.wmsdev.hacknation.values.PageValidation;

public record DnsResolutionError(String message) implements PageValidationError {
    @Override
    public String getDescription() {
        return "DNS resolution failed: " + message;
    }
}
