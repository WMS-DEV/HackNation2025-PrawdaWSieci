package pl.wmsdev.hacknation.values.PageValidation;

public record SslError(String message) implements PageValidationError {
    @Override
    public String getDescription() {
        return "SSL certificate validation failed: " + message;
    }
}
