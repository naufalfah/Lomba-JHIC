package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.Work;
import com.school.websitesekolah.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/works")
@RequiredArgsConstructor
public class WorkController {

    private final WorkService workService;

    @GetMapping
    public ResponseEntity<List<Work>> findAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(workService.search(search));
        }
        return ResponseEntity.ok(workService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Work> findById(@PathVariable Long id) {
        return ResponseEntity.ok(workService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Work> create(@RequestBody Work work) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workService.create(work));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Work> update(@PathVariable Long id, @RequestBody Work work) {
        return ResponseEntity.ok(workService.update(id, work));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        workService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
