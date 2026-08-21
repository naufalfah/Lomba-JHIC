package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

/**
 * Baris penerima prestasi. Menyimpan siapa (student/teacher/alumni/crew) yang
 * menerima sebuah achievement. Pada praktiknya hanya SATU dari keempat kolom
 * (student/teacher/alumni/crew) yang relevan untuk tiap baris — polanya mirip
 * "polymorphic recipient". Catatan: skema sumber menandai keempat FK ini
 * NOT NULL; jika penerima sesungguhnya cuma salah satu jenis, pertimbangkan
 * mengubah kolom yang tidak dipakai menjadi nullable di database.
 */
@Entity
@Table(name = "achievement_recipient")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AchievementRecipient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achievement_id", nullable = false)
    @JsonBackReference("achievement-recipient")
    private Achievement achievement;

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
