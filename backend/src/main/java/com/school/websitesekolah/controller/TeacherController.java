package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.Teacher;
import com.school.websitesekolah.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping
    public ResponseEntity<List<Teacher>> findAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(teacherService.search(search));
        }
        return ResponseEntity.ok(teacherService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> findById(@PathVariable Long id) {
        return ResponseEntity.ok(teacherService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Teacher> create(@RequestBody Teacher teacher) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teacherService.create(teacher));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teacher> update(@PathVariable Long id, @RequestBody Teacher teacher) {
        return ResponseEntity.ok(teacherService.update(id, teacher));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        teacherService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
