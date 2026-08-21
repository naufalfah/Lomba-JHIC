package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Alumni;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlumniRepository extends JpaRepository<Alumni, Long> {
    List<Alumni> findByStudent_NameContainingIgnoreCase(String name);
    List<Alumni> findByInstanceContainingIgnoreCase(String instance);
}
