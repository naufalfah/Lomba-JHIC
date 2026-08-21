package com.school.websitesekolah.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "facility_photo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacilityPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id", nullable = false)
    @JsonBackReference("facility-photo")
    private Facility facility;

    @Column(name = "image_path", nullable = false)
    private String imagePath;
}
