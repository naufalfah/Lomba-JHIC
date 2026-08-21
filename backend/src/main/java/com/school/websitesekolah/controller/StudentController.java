package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.Student;
import com.school.websitesekolah.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<List<Student>> findAll(@RequestParam(required = false) String search,
                                                   @RequestParam(required = false) Long majorId) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(studentService.search(search));
        }
        if (majorId != null) {
            return ResponseEntity.ok(studentService.findByMajorId(majorId));
        }
        return ResponseEntity.ok(studentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> findById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.findById(id));
    }

    @PostMapping("/major/{majorId}")
    public ResponseEntity<Student> create(@PathVariable Long majorId, @RequestBody Student student) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.create(majorId, student));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(@PathVariable Long id, @RequestBody Student student) {
        return ResponseEntity.ok(studentService.update(id, student));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        studentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
