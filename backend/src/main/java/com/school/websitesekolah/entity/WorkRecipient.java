package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

/**
 * Sama seperti AchievementRecipient: menyimpan siapa pemilik/pembuat karya
 * (student/teacher/alumni/crew). Lihat catatan pada AchievementRecipient
 * mengenai pola "polymorphic recipient" ini.
 */
@Entity
@Table(name = "work_recipient")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkRecipient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_id", nullable = false)
    @JsonBackReference("work-recipient")
    private Work work;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alumni_id", referencedColumnName = "student_id", nullable = false)
    private Alumni alumni;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id", nullable = false)
    private Crew crew;
}
