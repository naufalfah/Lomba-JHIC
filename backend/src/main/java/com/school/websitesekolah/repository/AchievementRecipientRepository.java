package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.AchievementRecipient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchievementRecipientRepository extends JpaRepository<AchievementRecipient, Long> {
    List<AchievementRecipient> findByAchievementId(Long achievementId);
    List<AchievementRecipient> findByStudentId(Long studentId);
    List<AchievementRecipient> findByTeacherId(Long teacherId);
    List<AchievementRecipient> findByAlumniStudentId(Long alumniStudentId);
    List<AchievementRecipient> findByCrewId(Long crewId);
}
