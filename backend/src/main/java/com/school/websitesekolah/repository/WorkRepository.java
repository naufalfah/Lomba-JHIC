package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkRepository extends JpaRepository<Work, Long> {
    List<Work> findByTitleContainingIgnoreCase(String title);
    List<Work> findByCategoryContainingIgnoreCase(String category);
}
