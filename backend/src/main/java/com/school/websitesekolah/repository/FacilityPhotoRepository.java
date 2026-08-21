package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.FacilityPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacilityPhotoRepository extends JpaRepository<FacilityPhoto, Long> {
    List<FacilityPhoto> findByFacilityId(Long facilityId);
}
