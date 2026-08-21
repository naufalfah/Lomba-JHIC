package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Teacher;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public List<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    public Teacher findById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guru dengan id " + id + " tidak ditemukan"));
    }

    public List<Teacher> search(String name) {
        return teacherRepository.findByNameContainingIgnoreCase(name);
    }

    public Teacher create(Teacher payload) {
        return teacherRepository.save(payload);
    }

    public Teacher update(Long id, Teacher payload) {
        Teacher existing = findById(id);
        existing.setNip(payload.getNip());
        existing.setName(payload.getName());
        existing.setImagePath(payload.getImagePath());
        existing.setEmail(payload.getEmail());
        existing.setAddress(payload.getAddress());
        existing.setSubject(payload.getSubject());
        return teacherRepository.save(existing);
    }

    public void delete(Long id) {
        Teacher existing = findById(id);
        teacherRepository.delete(existing);
    }
}
