package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.WorkRecipient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkRecipientRepository extends JpaRepository<WorkRecipient, Long> {
    List<WorkRecipient> findByWorkId(Long workId);
    List<WorkRecipient> findByStudentId(Long studentId);
    List<WorkRecipient> findByTeacherId(Long teacherId);
    List<WorkRecipient> findByAlumniStudentId(Long alumniStudentId);
    List<WorkRecipient> findByCrewId(Long crewId);
}
