package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.Facility;
import com.school.websitesekolah.service.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@RequiredArgsConstructor
public class FacilityController {

    private final FacilityService facilityService;

    @GetMapping
    public ResponseEntity<List<Facility>> findAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(facilityService.search(search));
        }
        return ResponseEntity.ok(facilityService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facility> findById(@PathVariable Long id) {
        return ResponseEntity.ok(facilityService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Facility> create(@RequestBody Facility facility) {
        return ResponseEntity.status(HttpStatus.CREATED).body(facilityService.create(facility));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Facility> update(@PathVariable Long id, @RequestBody Facility facility) {
        return ResponseEntity.ok(facilityService.update(id, facility));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        facilityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
