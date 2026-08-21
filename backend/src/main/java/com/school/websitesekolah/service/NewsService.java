package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.News;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NewsService {

    private final NewsRepository newsRepository;

    public List<News> findAll() {
        return newsRepository.findAll();
    }

    public News findById(Long id) {
        return newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Berita dengan id " + id + " tidak ditemukan"));
    }

    public List<News> search(String keyword) {
        return newsRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public News create(News payload) {
        return newsRepository.save(payload);
    }

    public News update(Long id, News payload) {
        News existing = findById(id);
        existing.setTitle(payload.getTitle());
        existing.setDescription(payload.getDescription());
        existing.setDate(payload.getDate());
        existing.setImagePath(payload.getImagePath());
        return newsRepository.save(existing);
    }

    public void delete(Long id) {
        News existing = findById(id);
        newsRepository.delete(existing);
    }
}
