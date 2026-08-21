package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.MajorCollab;
import com.school.websitesekolah.service.MajorCollabService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/major-collabs")
@RequiredArgsConstructor
public class MajorCollabController {

    private final MajorCollabService majorCollabService;

    @GetMapping
    public ResponseEntity<List<MajorCollab>> findAll(@RequestParam(required = false) Long majorId,
                                                       @RequestParam(required = false) String search) {
        if (majorId != null) {
            return ResponseEntity.ok(majorCollabService.findByMajorId(majorId));
        }
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(majorCollabService.search(search));
        }
        return ResponseEntity.ok(majorCollabService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MajorCollab> findById(@PathVariable Long id) {
        return ResponseEntity.ok(majorCollabService.findById(id));
    }

    @PostMapping("/major/{majorId}")
    public ResponseEntity<MajorCollab> create(@PathVariable Long majorId, @RequestBody MajorCollab payload) {
        return ResponseEntity.status(HttpStatus.CREATED).body(majorCollabService.create(majorId, payload));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MajorCollab> update(@PathVariable Long id, @RequestBody MajorCollab payload) {
        return ResponseEntity.ok(majorCollabService.update(id, payload));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        majorCollabService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
