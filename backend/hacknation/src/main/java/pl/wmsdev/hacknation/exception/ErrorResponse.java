package pl.wmsdev.hacknation.exception;

import java.util.List;

public record ErrorResponse(List<String> messages) {
}
