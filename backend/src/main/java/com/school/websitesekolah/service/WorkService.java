package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Work;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkService {

    private final WorkRepository workRepository;

    public List<Work> findAll() {
        return workRepository.findAll();
    }

    public Work findById(Long id) {
        return workRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Karya dengan id " + id + " tidak ditemukan"));
    }

    public List<Work> search(String keyword) {
        return workRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Work create(Work payload) {
        return workRepository.save(payload);
    }

    public Work update(Long id, Work payload) {
        Work existing = findById(id);
        existing.setTitle(payload.getTitle());
        existing.setDescription(payload.getDescription());
        existing.setImagePath(payload.getImagePath());
        existing.setCategory(payload.getCategory());
        existing.setDate(payload.getDate());
        return workRepository.save(existing);
    }

    public void delete(Long id) {
        Work existing = findById(id);
        workRepository.delete(existing);
    }
}
