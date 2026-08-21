package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nisn;

    @Column(nullable = false)
    private String name;

    @Column(name = "image_path")
    private String imagePath;

    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id", nullable = false)
    @JsonBackReference("major-student")
    private Major major;

    // Relasi 1-1 ke Alumni. Baris di tabel alumni hanya ada jika student tsb sudah lulus.
    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("student-alumni")
    private Alumni alumni;
}
