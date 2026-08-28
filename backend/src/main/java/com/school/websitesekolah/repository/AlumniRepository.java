package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Alumni;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlumniRepository extends JpaRepository<Alumni, Long> {
    List<Alumni> findByStudent_NameContainingIgnoreCase(String name);
    List<Alumni> findByInstanceContainingIgnoreCase(String instance);

    @Query("SELECT a FROM Alumni a JOIN a.student s LEFT JOIN s.major m WHERE " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(m.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.quote) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.instance) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Alumni> searchAlumni(@Param("keyword") String keyword);
}
