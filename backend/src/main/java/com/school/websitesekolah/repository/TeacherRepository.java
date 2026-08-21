package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByNip(String nip);
    List<Teacher> findByNameContainingIgnoreCase(String name);
    List<Teacher> findBySubjectContainingIgnoreCase(String subject);
}
