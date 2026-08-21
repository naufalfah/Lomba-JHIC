package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Major;
import com.school.websitesekolah.entity.MajorCollab;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.MajorCollabRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MajorCollabService {

    private final MajorCollabRepository majorCollabRepository;
    private final MajorService majorService;

    public List<MajorCollab> findAll() {
        return majorCollabRepository.findAll();
    }

    public MajorCollab findById(Long id) {
        return majorCollabRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kolaborasi jurusan dengan id " + id + " tidak ditemukan"));
    }

    public List<MajorCollab> findByMajorId(Long majorId) {
        return majorCollabRepository.findByMajorId(majorId);
    }

    public List<MajorCollab> search(String name) {
        return majorCollabRepository.findByNameContainingIgnoreCase(name);
    }

    public MajorCollab create(Long majorId, MajorCollab payload) {
        Major major = majorService.findById(majorId);
        payload.setMajor(major);
        return majorCollabRepository.save(payload);
    }

    public MajorCollab update(Long id, MajorCollab payload) {
        MajorCollab existing = findById(id);
        existing.setName(payload.getName());
        existing.setInfo(payload.getInfo());
        existing.setLogoPath(payload.getLogoPath());
        return majorCollabRepository.save(existing);
    }

    public void delete(Long id) {
        MajorCollab existing = findById(id);
        majorCollabRepository.delete(existing);
    }
}
