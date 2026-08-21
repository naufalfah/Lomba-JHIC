package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.MajorStatistic;
import com.school.websitesekolah.service.MajorStatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/major-statistics")
@RequiredArgsConstructor
public class MajorStatisticController {

    private final MajorStatisticService majorStatisticService;

    @GetMapping
    public ResponseEntity<List<MajorStatistic>> findAll(@RequestParam(required = false) Long majorId) {
        if (majorId != null) {
            return ResponseEntity.ok(majorStatisticService.findByMajorId(majorId));
        }
        return ResponseEntity.ok(majorStatisticService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MajorStatistic> findById(@PathVariable Long id) {
        return ResponseEntity.ok(majorStatisticService.findById(id));
    }

    @PostMapping("/major/{majorId}")
    public ResponseEntity<MajorStatistic> create(@PathVariable Long majorId, @RequestBody MajorStatistic payload) {
        return ResponseEntity.status(HttpStatus.CREATED).body(majorStatisticService.create(majorId, payload));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MajorStatistic> update(@PathVariable Long id, @RequestBody MajorStatistic payload) {
        return ResponseEntity.ok(majorStatisticService.update(id, payload));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        majorStatisticService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
