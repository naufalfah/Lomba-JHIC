package com.school.websitesekolah.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "teacher")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nip;

    @Column(nullable = false)
    private String name;

    @Column(name = "image_path")
    private String imagePath;

    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false)
    private String subject;
}
