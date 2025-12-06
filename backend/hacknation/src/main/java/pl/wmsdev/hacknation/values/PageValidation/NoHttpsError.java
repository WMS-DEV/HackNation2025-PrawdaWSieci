package pl.wmsdev.hacknation.values.PageValidation;

public final class NoHttpsError extends PageValidationError {
    @Override
    public String getDescription() {
        return "URL is not HTTPS";
    }
}
