package com.school.websitesekolah.controller;

import com.school.websitesekolah.dto.SearchResultResponse;
import com.school.websitesekolah.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    // GET /api/search?keyword=... -> cari sekaligus di student, teacher, achievement, facility, alumni
    @GetMapping
    public ResponseEntity<SearchResultResponse> search(@RequestParam String keyword) {
        return ResponseEntity.ok(searchService.searchAll(keyword));
    }
}
