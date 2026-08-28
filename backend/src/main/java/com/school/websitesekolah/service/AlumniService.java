package com.school.websitesekolah.service;

import com.school.websitesekolah.dto.AlumniRequestDTO;
import com.school.websitesekolah.entity.Alumni;
import com.school.websitesekolah.entity.Major;
import com.school.websitesekolah.entity.Student;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.AlumniRepository;
import com.school.websitesekolah.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AlumniService {

    private final AlumniRepository alumniRepository;
    private final StudentRepository studentRepository;
    private final StudentService studentService;
    private final MajorService majorService;

    public List<Alumni> findAll() {
        return alumniRepository.findAll();
    }

    public Alumni findByStudentId(Long studentId) {
        return alumniRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Data alumni untuk siswa id " + studentId + " tidak ditemukan"));
    }

    public List<Alumni> search(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return findAll();
        }
        return alumniRepository.searchAlumni(keyword);
    }

    public Alumni createFromDto(AlumniRequestDTO dto) {
        Student student;
        if (dto.getStudentId() != null) {
            student = studentService.findById(dto.getStudentId());
        } else {
            student = new Student();
            student.setName(dto.getName() != null ? dto.getName() : "Tanpa Nama");
            student.setEmail(dto.getEmail());
            student.setNisn(dto.getNisn() != null && !dto.getNisn().isBlank() 
                    ? dto.getNisn() 
                    : "ALM-" + System.currentTimeMillis());
            student.setAddress(dto.getAddress() != null ? dto.getAddress() : "-");

            if (dto.getMajorId() != null) {
                Major major = majorService.findById(dto.getMajorId());
                student.setMajor(major);
            } else {
                List<Major> allMajors = majorService.findAll();
                if (!allMajors.isEmpty()) {
                    student.setMajor(allMajors.get(0));
                }
            }
            student = studentRepository.save(student);
        }

        Alumni alumni = student.getAlumni();
        if (alumni == null) {
            alumni = new Alumni();
            alumni.setStudent(student);
        }

        if (dto.getGraduationYear() != null) {
            alumni.setGraduationYear(LocalDateTime.of(dto.getGraduationYear(), 1, 1, 0, 0));
        } else {
            alumni.setGraduationYear(LocalDateTime.now());
        }

        alumni.setInstance(dto.getInstance() != null ? dto.getInstance() : "");
        alumni.setQuote(dto.getQuote() != null ? dto.getQuote() : "");

        student.setAlumni(alumni);
        Student savedStudent = studentRepository.save(student);
        return savedStudent.getAlumni();
    }

    public Alumni updateFromDto(Long studentId, AlumniRequestDTO dto) {
        Alumni existing = findByStudentId(studentId);
        Student student = existing.getStudent();

        if (dto.getName() != null) {
            student.setName(dto.getName());
        }
        if (dto.getEmail() != null) {
            student.setEmail(dto.getEmail());
        }
        if (dto.getMajorId() != null) {
            Major major = majorService.findById(dto.getMajorId());
            student.setMajor(major);
        }
        if (dto.getNisn() != null && !dto.getNisn().isBlank()) {
            student.setNisn(dto.getNisn());
        }
        if (dto.getAddress() != null) {
            student.setAddress(dto.getAddress());
        }

        if (dto.getGraduationYear() != null) {
            existing.setGraduationYear(LocalDateTime.of(dto.getGraduationYear(), 1, 1, 0, 0));
        }
        if (dto.getInstance() != null) {
            existing.setInstance(dto.getInstance());
        }
        if (dto.getQuote() != null) {
            existing.setQuote(dto.getQuote());
        }

        existing.setStudent(student);
        student.setAlumni(existing);
        studentRepository.save(student);
        return alumniRepository.save(existing);
    }

    // Legacy/direct methods
    public Alumni create(Long studentId, Alumni payload) {
        Student student = studentService.findById(studentId);
        payload.setStudent(student);
        payload.setStudentId(studentId);
        student.setAlumni(payload);
        studentRepository.save(student);
        return payload;
    }

    public Alumni update(Long studentId, Alumni payload) {
        Alumni existing = findByStudentId(studentId);
        existing.setInstance(payload.getInstance());
        existing.setGraduationYear(payload.getGraduationYear());
        existing.setQuote(payload.getQuote());
        return alumniRepository.save(existing);
    }

    public void delete(Long studentId) {
        Alumni existing = alumniRepository.findById(studentId).orElse(null);
        if (existing == null) return;
        
        Student student = existing.getStudent();
        if (student != null) {
            student.setAlumni(null);
            studentRepository.save(student);
        }
        alumniRepository.delete(existing);
        if (student != null && student.getNisn() != null && student.getNisn().startsWith("ALM-")) {
            studentRepository.delete(student);
        }
    }
}
