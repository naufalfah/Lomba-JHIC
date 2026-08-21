package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Achievement;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AchievementService {

    private final AchievementRepository achievementRepository;

    public List<Achievement> findAll() {
        return achievementRepository.findAll();
    }

    public Achievement findById(Long id) {
        return achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prestasi dengan id " + id + " tidak ditemukan"));
    }

    public List<Achievement> search(String keyword) {
        return achievementRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Achievement create(Achievement payload) {
        return achievementRepository.save(payload);
    }

    public Achievement update(Long id, Achievement payload) {
        Achievement existing = findById(id);
        existing.setTitle(payload.getTitle());
        existing.setDescription(payload.getDescription());
        existing.setImagePath(payload.getImagePath());
        existing.setTier(payload.getTier());
        existing.setRank(payload.getRank());
        existing.setDate(payload.getDate());
        existing.setOrganizer(payload.getOrganizer());
        return achievementRepository.save(existing);
    }

    public void delete(Long id) {
        Achievement existing = findById(id);
        achievementRepository.delete(existing);
    }
}
