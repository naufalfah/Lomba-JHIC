package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.WorkRecipient;
import com.school.websitesekolah.service.WorkRecipientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-recipients")
@RequiredArgsConstructor
public class WorkRecipientController {

    private final WorkRecipientService workRecipientService;

    @GetMapping
    public ResponseEntity<List<WorkRecipient>> findAll(@RequestParam(required = false) Long workId) {
        if (workId != null) {
            return ResponseEntity.ok(workRecipientService.findByWorkId(workId));
        }
        return ResponseEntity.ok(workRecipientService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkRecipient> findById(@PathVariable Long id) {
        return ResponseEntity.ok(workRecipientService.findById(id));
    }

    // Isi tepat SATU dari studentId/teacherId/alumniId/crewId sesuai jenis pemilik karya
    @PostMapping("/work/{workId}")
    public ResponseEntity<WorkRecipient> create(@PathVariable Long workId,
                                                 @RequestParam(required = false) Long studentId,
                                                 @RequestParam(required = false) Long teacherId,
                                                 @RequestParam(required = false) Long alumniId,
                                                 @RequestParam(required = false) Long crewId) {
        WorkRecipient created = workRecipientService.create(workId, studentId, teacherId, alumniId, crewId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        workRecipientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
