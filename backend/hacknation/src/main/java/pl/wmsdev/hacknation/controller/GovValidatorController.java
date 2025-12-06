package pl.wmsdev.hacknation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.wmsdev.hacknation.entity.CheckResponse;
import pl.wmsdev.hacknation.values.ValidationResult;
import pl.wmsdev.hacknation.entity.PageData;
import pl.wmsdev.hacknation.service.GovValidatorService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/validation")
@RequiredArgsConstructor
public class GovValidatorController {
    private final GovValidatorService govValidatorService;
    @PostMapping
    public ResponseEntity<CheckResponse> startValidation(@RequestBody PageData pageData) {
        return ResponseEntity.ok(govValidatorService.validatePage(pageData));
    }

    @GetMapping("/{validationId}")
    public ResponseEntity<ValidationResult> getValidationResult(@PathVariable UUID validationId) {
        return ResponseEntity.ok(govValidatorService.getValidationResult(validationId));
    }
}
