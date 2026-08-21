package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.FacilityPhoto;
import com.school.websitesekolah.service.FacilityPhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facility-photos")
@RequiredArgsConstructor
public class FacilityPhotoController {

    private final FacilityPhotoService facilityPhotoService;

    @GetMapping
    public ResponseEntity<List<FacilityPhoto>> findAll(@RequestParam(required = false) Long facilityId) {
        if (facilityId != null) {
            return ResponseEntity.ok(facilityPhotoService.findByFacilityId(facilityId));
        }
        return ResponseEntity.ok(facilityPhotoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacilityPhoto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(facilityPhotoService.findById(id));
    }

    @PostMapping("/facility/{facilityId}")
    public ResponseEntity<FacilityPhoto> create(@PathVariable Long facilityId, @RequestBody FacilityPhoto payload) {
        return ResponseEntity.status(HttpStatus.CREATED).body(facilityPhotoService.create(facilityId, payload));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        facilityPhotoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
