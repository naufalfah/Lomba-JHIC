package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.MajorCollab;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MajorCollabRepository extends JpaRepository<MajorCollab, Long> {
    List<MajorCollab> findByMajorId(Long majorId);
    List<MajorCollab> findByNameContainingIgnoreCase(String name);
}
