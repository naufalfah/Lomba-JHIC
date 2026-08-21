package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Alumni memakai primary key yang sama dengan student (shared PK / 1-1).
 * Kolom "student_id" adalah PK sekaligus FK ke student.id.
 */
@Entity
@Table(name = "alumni")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alumni {

    @Id
    @Column(name = "student_id")
    private Long studentId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "student_id")
    @JsonBackReference("student-alumni")
    private Student student;

    private String instance;

    @Column(name = "graduation_year")
    private LocalDateTime graduationYear;

    @Column(columnDefinition = "TEXT")
    private String quote;
}
