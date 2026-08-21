package com.school.websitesekolah.service;

import com.school.websitesekolah.dto.SearchResultResponse;
import com.school.websitesekolah.repository.AchievementRepository;
import com.school.websitesekolah.repository.AlumniRepository;
import com.school.websitesekolah.repository.FacilityRepository;
import com.school.websitesekolah.repository.StudentRepository;
import com.school.websitesekolah.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Fitur pencarian global di website sekolah: satu kata kunci dicari sekaligus
 * ke student, achievement, teacher, facility, dan alumni.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {

    private final StudentRepository studentRepository;
    private final AchievementRepository achievementRepository;
    private final TeacherRepository teacherRepository;
    private final FacilityRepository facilityRepository;
    private final AlumniRepository alumniRepository;

    public SearchResultResponse searchAll(String keyword) {
        return new SearchResultResponse(
                studentRepository.findByNameContainingIgnoreCase(keyword),
                teacherRepository.findByNameContainingIgnoreCase(keyword),
                achievementRepository.findByTitleContainingIgnoreCase(keyword),
                facilityRepository.findByTitleContainingIgnoreCase(keyword),
                alumniRepository.findByStudent_NameContainingIgnoreCase(keyword)
        );
    }
}
