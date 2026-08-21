package com.school.websitesekolah.controller;

import com.school.websitesekolah.entity.News;
import com.school.websitesekolah.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public ResponseEntity<List<News>> findAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(newsService.search(search));
        }
        return ResponseEntity.ok(newsService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> findById(@PathVariable Long id) {
        return ResponseEntity.ok(newsService.findById(id));
    }

    @PostMapping
    public ResponseEntity<News> create(@RequestBody News news) {
        return ResponseEntity.status(HttpStatus.CREATED).body(newsService.create(news));
    }

    @PutMapping("/{id}")
    public ResponseEntity<News> update(@PathVariable Long id, @RequestBody News news) {
        return ResponseEntity.ok(newsService.update(id, news));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        newsService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
