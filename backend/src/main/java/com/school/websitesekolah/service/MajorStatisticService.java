package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Major;
import com.school.websitesekolah.entity.MajorStatistic;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.MajorStatisticRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MajorStatisticService {

    private final MajorStatisticRepository majorStatisticRepository;
    private final MajorService majorService;

    public List<MajorStatistic> findAll() {
        return majorStatisticRepository.findAll();
    }

    public MajorStatistic findById(Long id) {
        return majorStatisticRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Statistik jurusan dengan id " + id + " tidak ditemukan"));
    }

    public List<MajorStatistic> findByMajorId(Long majorId) {
        return majorStatisticRepository.findByMajorId(majorId);
    }

    public MajorStatistic create(Long majorId, MajorStatistic payload) {
        Major major = majorService.findById(majorId);
        payload.setMajor(major);
        return majorStatisticRepository.save(payload);
    }

    public MajorStatistic update(Long id, MajorStatistic payload) {
        MajorStatistic existing = findById(id);
        existing.setCategory(payload.getCategory());
        existing.setPercentage(payload.getPercentage());
        return majorStatisticRepository.save(existing);
    }

    public void delete(Long id) {
        MajorStatistic existing = findById(id);
        majorStatisticRepository.delete(existing);
    }
}
