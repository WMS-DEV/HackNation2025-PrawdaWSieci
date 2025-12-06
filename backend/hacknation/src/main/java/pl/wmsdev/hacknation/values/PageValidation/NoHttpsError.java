package pl.wmsdev.hacknation.values.PageValidation;

public record NoHttpsError() implements PageValidationError {
    @Override
    public String getDescription() {
        return "URL is not HTTPS";
    }
}
