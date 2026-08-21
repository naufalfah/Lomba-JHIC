package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "major_statistic")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MajorStatistic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id", nullable = false)
    @JsonBackReference("major-statistic")
    private Major major;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal percentage;
}
