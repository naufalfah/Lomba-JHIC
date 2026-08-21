package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findByTitleContainingIgnoreCase(String title);
    List<Achievement> findByTierContainingIgnoreCase(String tier);
    List<Achievement> findByOrganizerContainingIgnoreCase(String organizer);
}
