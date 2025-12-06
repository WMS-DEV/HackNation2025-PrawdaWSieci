package pl.wmsdev.hacknation.entity;

import jakarta.validation.constraints.NotBlank;

public record PageData(
        @NotBlank(message = "URL cannot be blank")
        String url,
        @NotBlank(message = "Server IP cannot be blank")
        String serverIp
) {}
