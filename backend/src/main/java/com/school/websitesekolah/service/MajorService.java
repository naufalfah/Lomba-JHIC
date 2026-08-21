package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Major;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.MajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MajorService {

    private final MajorRepository majorRepository;

    public List<Major> findAll() {
        return majorRepository.findAll();
    }

    public Major findById(Long id) {
        return majorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Jurusan dengan id " + id + " tidak ditemukan"));
    }

    public List<Major> search(String name) {
        return majorRepository.findByNameContainingIgnoreCase(name);
    }

    public Major create(Major major) {
        return majorRepository.save(major);
    }

    public Major update(Long id, Major payload) {
        Major existing = findById(id);
        existing.setName(payload.getName());
        existing.setLogoPath(payload.getLogoPath());
        return majorRepository.save(existing);
    }

    public void delete(Long id) {
        Major existing = findById(id);
        majorRepository.delete(existing);
    }
}
