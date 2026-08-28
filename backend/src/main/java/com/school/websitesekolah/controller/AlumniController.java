package com.school.websitesekolah.controller;

import com.school.websitesekolah.dto.AlumniRequestDTO;
import com.school.websitesekolah.entity.Alumni;
import com.school.websitesekolah.service.AlumniService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumni")
@RequiredArgsConstructor
public class AlumniController {

    private final AlumniService alumniService;

    @GetMapping
    public ResponseEntity<List<Alumni>> findAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(alumniService.search(search));
        }
        return ResponseEntity.ok(alumniService.findAll());
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<Alumni> findByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(alumniService.findByStudentId(studentId));
    }

    @PostMapping
    public ResponseEntity<Alumni> createFromDto(@RequestBody AlumniRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(alumniService.createFromDto(dto));
    }

    @PostMapping("/student/{studentId}")
    public ResponseEntity<Alumni> create(@PathVariable Long studentId, @RequestBody Alumni payload) {
        return ResponseEntity.status(HttpStatus.CREATED).body(alumniService.create(studentId, payload));
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<Alumni> updateFromDto(@PathVariable Long studentId, @RequestBody AlumniRequestDTO dto) {
        return ResponseEntity.ok(alumniService.updateFromDto(studentId, dto));
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<Void> delete(@PathVariable Long studentId) {
        alumniService.delete(studentId);
        return ResponseEntity.noContent().build();
    }
}
