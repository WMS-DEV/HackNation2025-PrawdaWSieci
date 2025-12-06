package pl.wmsdev.hacknation.values.PageValidation;

public abstract class PageValidationError extends Throwable {
    public abstract String getDescription();
}
