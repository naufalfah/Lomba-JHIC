package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.AchievementRecipient;
import com.school.websitesekolah.service.AchievementRecipientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievement-recipients")
@RequiredArgsConstructor
public class AchievementRecipientController {

    private final AchievementRecipientService achievementRecipientService;

    @GetMapping
    public ResponseEntity<List<AchievementRecipient>> findAll(@RequestParam(required = false) Long achievementId) {
        if (achievementId != null) {
            return ResponseEntity.ok(achievementRecipientService.findByAchievementId(achievementId));
        }
        return ResponseEntity.ok(achievementRecipientService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AchievementRecipient> findById(@PathVariable Long id) {
        return ResponseEntity.ok(achievementRecipientService.findById(id));
    }

    // Isi tepat SATU dari studentId/teacherId/alumniId/crewId sesuai jenis penerima
    @PostMapping("/achievement/{achievementId}")
    public ResponseEntity<AchievementRecipient> create(@PathVariable Long achievementId,
                                                         @RequestParam(required = false) Long studentId,
                                                         @RequestParam(required = false) Long teacherId,
                                                         @RequestParam(required = false) Long alumniId,
                                                         @RequestParam(required = false) Long crewId) {
        AchievementRecipient created = achievementRecipientService.create(achievementId, studentId, teacherId, alumniId, crewId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        achievementRecipientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
