package pl.wmsdev.hacknation.entity;

import java.util.List;

public record CheckResponse(boolean isValid, List<String> reasons, String hash) {
}
