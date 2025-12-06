package pl.wmsdev.hacknation.values.PageValidation;

import java.util.Objects;

public final class DnsResolutionError extends PageValidationError {
    private final String message;

    public DnsResolutionError(String message) {
        this.message = message;
    }

    @Override
    public String getDescription() {
        return "DNS resolution failed: " + message;
    }
}
