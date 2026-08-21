package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Facility;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.FacilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FacilityService {

    private final FacilityRepository facilityRepository;

    public List<Facility> findAll() {
        return facilityRepository.findAll();
    }

    public Facility findById(Long id) {
        return facilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fasilitas dengan id " + id + " tidak ditemukan"));
    }

    public List<Facility> search(String keyword) {
        return facilityRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Facility create(Facility payload) {
        return facilityRepository.save(payload);
    }

    public Facility update(Long id, Facility payload) {
        Facility existing = findById(id);
        existing.setTitle(payload.getTitle());
        existing.setUtility(payload.getUtility());
        existing.setInfo(payload.getInfo());
        existing.setQuantity(payload.getQuantity());
        existing.setYear(payload.getYear());
        return facilityRepository.save(existing);
    }

    public void delete(Long id) {
        Facility existing = findById(id);
        facilityRepository.delete(existing);
    }
}
