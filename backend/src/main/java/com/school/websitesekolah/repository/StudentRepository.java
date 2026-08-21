package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByNisn(String nisn);
    List<Student> findByNameContainingIgnoreCase(String name);
    List<Student> findByMajorId(Long majorId);
}
