package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.Major;
import com.school.websitesekolah.service.MajorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/majors")
@RequiredArgsConstructor
public class MajorController {

    private final MajorService majorService;

    @GetMapping
    public ResponseEntity<List<Major>> findAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(majorService.search(search));
        }
        return ResponseEntity.ok(majorService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Major> findById(@PathVariable Long id) {
        return ResponseEntity.ok(majorService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Major> create(@RequestBody Major major) {
        return ResponseEntity.status(HttpStatus.CREATED).body(majorService.create(major));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Major> update(@PathVariable Long id, @RequestBody Major major) {
        return ResponseEntity.ok(majorService.update(id, major));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        majorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
