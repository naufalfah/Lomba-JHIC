package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "major_collab")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MajorCollab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String info;

    @Column(name = "logo_path")
    private String logoPath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id", nullable = false)
    @JsonBackReference("major-collab")
    private Major major;
}
