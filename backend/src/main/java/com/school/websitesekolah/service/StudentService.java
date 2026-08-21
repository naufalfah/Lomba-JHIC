package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Major;
import com.school.websitesekolah.entity.Student;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentService {

    private final StudentRepository studentRepository;
    private final MajorService majorService;

    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    public Student findById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Siswa dengan id " + id + " tidak ditemukan"));
    }

    public List<Student> search(String name) {
        return studentRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Student> findByMajorId(Long majorId) {
        return studentRepository.findByMajorId(majorId);
    }

    public Student create(Long majorId, Student payload) {
        Major major = majorService.findById(majorId);
        payload.setMajor(major);
        return studentRepository.save(payload);
    }

    public Student update(Long id, Student payload) {
        Student existing = findById(id);
        existing.setNisn(payload.getNisn());
        existing.setName(payload.getName());
        existing.setImagePath(payload.getImagePath());
        existing.setEmail(payload.getEmail());
        existing.setAddress(payload.getAddress());
        if (payload.getMajor() != null && payload.getMajor().getId() != null) {
            existing.setMajor(majorService.findById(payload.getMajor().getId()));
        }
        return studentRepository.save(existing);
    }

    public void delete(Long id) {
        Student existing = findById(id);
        studentRepository.delete(existing);
    }
}
