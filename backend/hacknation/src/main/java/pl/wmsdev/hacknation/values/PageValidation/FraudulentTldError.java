package pl.wmsdev.hacknation.values.PageValidation;

public final class FraudulentTldError extends PageValidationError {
    @Override
    public String getDescription() {
        return "Host is not a valid gov.pl domain";
    }
}
