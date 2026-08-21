package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Achievement;
import com.school.websitesekolah.entity.AchievementRecipient;
import com.school.websitesekolah.entity.Alumni;
import com.school.websitesekolah.entity.Crew;
import com.school.websitesekolah.entity.Student;
import com.school.websitesekolah.entity.Teacher;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.AchievementRecipientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Menghubungkan sebuah Achievement dengan penerimanya.
 * Isi TEPAT SATU dari recipientStudentId / recipientTeacherId / recipientAlumniId / recipientCrewId
 * pada saat memanggil create(), sesuai jenis penerima prestasi tersebut.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class AchievementRecipientService {

    private final AchievementRecipientRepository achievementRecipientRepository;
    private final AchievementService achievementService;
    private final StudentService studentService;
    private final TeacherService teacherService;
    private final AlumniService alumniService;
    private final CrewService crewService;

    public List<AchievementRecipient> findAll() {
        return achievementRecipientRepository.findAll();
    }

    public AchievementRecipient findById(Long id) {
        return achievementRecipientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Data penerima prestasi id " + id + " tidak ditemukan"));
    }

    public List<AchievementRecipient> findByAchievementId(Long achievementId) {
        return achievementRecipientRepository.findByAchievementId(achievementId);
    }

    public AchievementRecipient create(Long achievementId, Long studentId, Long teacherId, Long alumniId, Long crewId) {
        Achievement achievement = achievementService.findById(achievementId);

        Student student = studentId != null ? studentService.findById(studentId) : null;
        Teacher teacher = teacherId != null ? teacherService.findById(teacherId) : null;
        Alumni alumni = alumniId != null ? alumniService.findByStudentId(alumniId) : null;
        Crew crew = crewId != null ? crewService.findById(crewId) : null;

        AchievementRecipient recipient = AchievementRecipient.builder()
                .achievement(achievement)
                .student(student)
                .teacher(teacher)
                .alumni(alumni)
                .crew(crew)
                .build();

        return achievementRecipientRepository.save(recipient);
    }

    public void delete(Long id) {
        AchievementRecipient existing = findById(id);
        achievementRecipientRepository.delete(existing);
    }
}
