package pl.wmsdev.hacknation.values.PageValidation;

public final class MalformedUrlError extends PageValidationError {
    private final String message;

    public MalformedUrlError(String message) {
        this.message = message;
    }

    @Override
    public String getDescription() {
        return "Malformed URL: " + message;
    }
}
