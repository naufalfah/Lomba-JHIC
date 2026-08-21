package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findByTitleContainingIgnoreCase(String title);
}
