package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Alumni;
import com.school.websitesekolah.entity.Student;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.AlumniRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AlumniService {

    private final AlumniRepository alumniRepository;
    private final StudentService studentService;

    public List<Alumni> findAll() {
        return alumniRepository.findAll();
    }

    public Alumni findByStudentId(Long studentId) {
        return alumniRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Data alumni untuk siswa id " + studentId + " tidak ditemukan"));
    }

    public List<Alumni> search(String name) {
        return alumniRepository.findByStudent_NameContainingIgnoreCase(name);
    }

    // Menjadikan seorang student sebagai alumni (student harus sudah ada)
    public Alumni create(Long studentId, Alumni payload) {
        Student student = studentService.findById(studentId);
        payload.setStudent(student);
        payload.setStudentId(studentId);
        return alumniRepository.save(payload);
    }

    public Alumni update(Long studentId, Alumni payload) {
        Alumni existing = findByStudentId(studentId);
        existing.setInstance(payload.getInstance());
        existing.setGraduationYear(payload.getGraduationYear());
        existing.setQuote(payload.getQuote());
        return alumniRepository.save(existing);
    }

    public void delete(Long studentId) {
        Alumni existing = findByStudentId(studentId);
        alumniRepository.delete(existing);
    }
}
