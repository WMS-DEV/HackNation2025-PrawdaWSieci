package pl.wmsdev.hacknation.values.PageValidation;

public record MalformedUrlError(String message) implements PageValidationError {
    @Override
    public String getDescription() {
        return "Malformed URL: " + message;
    }
}
