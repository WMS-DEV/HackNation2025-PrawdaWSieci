package pl.wmsdev.hacknation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.wmsdev.hacknation.service.GovValidatorService;

@RestController
@RequestMapping("/api/v1/validation")
@RequiredArgsConstructor
public class GovValidatorController {
    private final GovValidatorService govValidatorService;
    @PostMapping
    public ResponseEntity<?> startValidation() {
        return ResponseEntity.ok().build();
    }
}
