package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "achievement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_path")
    private String imagePath;

    private String tier;

    @Column(nullable = false)
    private Integer rank;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String organizer;

    @Builder.Default
    @OneToMany(mappedBy = "achievement", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("achievement-recipient")
    private List<AchievementRecipient> achievementRecipients = new ArrayList<>();
}
