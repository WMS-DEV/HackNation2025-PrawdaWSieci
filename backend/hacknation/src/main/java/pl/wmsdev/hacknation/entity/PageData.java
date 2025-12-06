package pl.wmsdev.hacknation.entity;

import java.time.Instant;

public record PageData(
        String url,
        String serverIp,
        Instant timestamp
) {}
