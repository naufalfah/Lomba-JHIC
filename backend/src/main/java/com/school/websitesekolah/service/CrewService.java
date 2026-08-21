package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Crew;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CrewService {

    private final CrewRepository crewRepository;

    public List<Crew> findAll() {
        return crewRepository.findAll();
    }

    public Crew findById(Long id) {
        return crewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crew dengan id " + id + " tidak ditemukan"));
    }

    public List<Crew> search(String name) {
        return crewRepository.findByNameContainingIgnoreCase(name);
    }

    public Crew create(Crew payload) {
        return crewRepository.save(payload);
    }

    public Crew update(Long id, Crew payload) {
        Crew existing = findById(id);
        existing.setName(payload.getName());
        existing.setImagePath(payload.getImagePath());
        existing.setEmail(payload.getEmail());
        existing.setAddress(payload.getAddress());
        existing.setRole(payload.getRole());
        return crewRepository.save(existing);
    }

    public void delete(Long id) {
        Crew existing = findById(id);
        crewRepository.delete(existing);
    }
}
