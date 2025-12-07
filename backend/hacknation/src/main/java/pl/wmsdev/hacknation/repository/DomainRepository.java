package pl.wmsdev.hacknation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.wmsdev.hacknation.entity.DomainEntry;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DomainRepository extends JpaRepository<DomainEntry, UUID> {
    Optional<DomainEntry> findByDomain(String domain);
}
