package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
    List<Facility> findByTitleContainingIgnoreCase(String title);
    List<Facility> findByUtilityContainingIgnoreCase(String utility);
}
