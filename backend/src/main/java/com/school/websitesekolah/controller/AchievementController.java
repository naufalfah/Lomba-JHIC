package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.Achievement;
import com.school.websitesekolah.service.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping
    public ResponseEntity<List<Achievement>> findAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(achievementService.search(search));
        }
        return ResponseEntity.ok(achievementService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Achievement> findById(@PathVariable Long id) {
        return ResponseEntity.ok(achievementService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Achievement> create(@RequestBody Achievement achievement) {
        return ResponseEntity.status(HttpStatus.CREATED).body(achievementService.create(achievement));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Achievement> update(@PathVariable Long id, @RequestBody Achievement achievement) {
        return ResponseEntity.ok(achievementService.update(id, achievement));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        achievementService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
