package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Facility;
import com.school.websitesekolah.entity.FacilityPhoto;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.FacilityPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FacilityPhotoService {

    private final FacilityPhotoRepository facilityPhotoRepository;
    private final FacilityService facilityService;

    public List<FacilityPhoto> findAll() {
        return facilityPhotoRepository.findAll();
    }

    public FacilityPhoto findById(Long id) {
        return facilityPhotoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Foto fasilitas id " + id + " tidak ditemukan"));
    }

    public List<FacilityPhoto> findByFacilityId(Long facilityId) {
        return facilityPhotoRepository.findByFacilityId(facilityId);
    }

    public FacilityPhoto create(Long facilityId, FacilityPhoto payload) {
        Facility facility = facilityService.findById(facilityId);
        payload.setFacility(facility);
        return facilityPhotoRepository.save(payload);
    }

    public void delete(Long id) {
        FacilityPhoto existing = findById(id);
        facilityPhotoRepository.delete(existing);
    }
}
