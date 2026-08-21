package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.MajorStatistic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MajorStatisticRepository extends JpaRepository<MajorStatistic, Long> {
    List<MajorStatistic> findByMajorId(Long majorId);
}
