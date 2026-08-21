package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrewRepository extends JpaRepository<Crew, Long> {
    List<Crew> findByNameContainingIgnoreCase(String name);
}
