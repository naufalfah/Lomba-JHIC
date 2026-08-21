package com.school.websitesekolah.repository;

import com.school.websitesekolah.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByEmail(String email);
    boolean existsByEmail(String email);
}
