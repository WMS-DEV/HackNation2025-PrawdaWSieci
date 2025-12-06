package pl.wmsdev.hacknation.values.PageValidation;

public final class SslError extends PageValidationError {
    private final String message;

    public SslError(String message) {
        this.message = message;
    }

    @Override
    public String getDescription() {
        return "SSL certificate validation failed: " + message;
    }
}
