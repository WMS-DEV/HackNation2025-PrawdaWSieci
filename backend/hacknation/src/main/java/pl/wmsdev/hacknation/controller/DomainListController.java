package pl.wmsdev.hacknation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.wmsdev.hacknation.entity.DomainAddRequest;
import pl.wmsdev.hacknation.entity.DomainEntry;
import pl.wmsdev.hacknation.repository.DomainRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/domains")
@RequiredArgsConstructor
public class DomainListController {
    private final DomainRepository domainRepository;

    @GetMapping("")
    public ResponseEntity<List<DomainEntry>> getGovDomains() {
        return ResponseEntity.ok(domainRepository.findAll());
    }

    // TODO: Find a better way to seed the database
    @PostMapping("")
    public ResponseEntity<DomainEntry> addDomain(@RequestBody DomainAddRequest request) {
        return ResponseEntity.ok(domainRepository.save(DomainEntry.builder()
                .domain(request.domain())
                .build()));
    }
}
