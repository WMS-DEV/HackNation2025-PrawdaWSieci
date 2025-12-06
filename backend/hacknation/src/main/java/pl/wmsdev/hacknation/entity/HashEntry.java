package pl.wmsdev.hacknation.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import pl.wmsdev.hacknation.values.CheckResult;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HashEntry {
    @Id
    private UUID id;

    private String originalUrl;

    private String serverIp;

    private Instant timestamp;

    private CheckResult result;
}
