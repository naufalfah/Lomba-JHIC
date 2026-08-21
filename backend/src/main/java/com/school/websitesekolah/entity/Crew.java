package com.school.websitesekolah.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "crew")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Crew {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "image_path")
    private String imagePath;

    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    private String role;
}
