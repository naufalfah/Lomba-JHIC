package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "major")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Major {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "logo_path")
    private String logoPath;

    @Builder.Default
    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("major-student")
    private List<Student> students = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("major-statistic")
    private List<MajorStatistic> majorStatistics = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("major-collab")
    private List<MajorCollab> majorCollabs = new ArrayList<>();
}
