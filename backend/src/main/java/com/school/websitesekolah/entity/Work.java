package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "work")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_path")
    private String imagePath;

    @Column(nullable = false)
    private String category;

    private LocalDate date;

    @Builder.Default
    @OneToMany(mappedBy = "work", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("work-recipient")
    private List<WorkRecipient> workRecipients = new ArrayList<>();
}
