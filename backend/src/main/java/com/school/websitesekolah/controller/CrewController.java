package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.Crew;
import com.school.websitesekolah.service.CrewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewController {

    private final CrewService crewService;

    @GetMapping
    public ResponseEntity<List<Crew>> findAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(crewService.search(search));
        }
        return ResponseEntity.ok(crewService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Crew> findById(@PathVariable Long id) {
        return ResponseEntity.ok(crewService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Crew> create(@RequestBody Crew crew) {
        return ResponseEntity.status(HttpStatus.CREATED).body(crewService.create(crew));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Crew> update(@PathVariable Long id, @RequestBody Crew crew) {
        return ResponseEntity.ok(crewService.update(id, crew));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        crewService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
