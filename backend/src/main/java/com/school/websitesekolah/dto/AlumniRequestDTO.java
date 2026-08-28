package com.school.websitesekolah.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlumniRequestDTO {
    private Long studentId;
    private String name;
    private String email;
    private Long majorId;
    private String nisn;
    private String address;
    private String instance;
    private Integer graduationYear; // e.g. 2024
    private String quote; // Keterangan prestasi / quote
}
