package pl.wmsdev.hacknation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.wmsdev.hacknation.entity.HashEntry;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface HashRepository extends JpaRepository<HashEntry, UUID> {
    Optional<HashEntry> findById(UUID id);
}