package pl.wmsdev.hacknation.values.PageValidation;

public record FraudulentTldError() implements PageValidationError {
    @Override
    public String getDescription() {
        return "Host is not a valid gov.pl domain";
    }
}
