package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Major;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MajorRepository extends JpaRepository<Major, Long> {
    List<Major> findByNameContainingIgnoreCase(String name);
}
