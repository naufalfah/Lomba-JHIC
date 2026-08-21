package com.school.websitesekolah.service;

import com.school.websitesekolah.entity.Alumni;
import com.school.websitesekolah.entity.Crew;
import com.school.websitesekolah.entity.Student;
import com.school.websitesekolah.entity.Teacher;
import com.school.websitesekolah.entity.Work;
import com.school.websitesekolah.entity.WorkRecipient;
import com.school.websitesekolah.exception.ResourceNotFoundException;
import com.school.websitesekolah.repository.WorkRecipientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Sama seperti AchievementRecipientService, isi TEPAT SATU dari keempat id
 * penerima sesuai jenis pemilik karya.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class WorkRecipientService {

    private final WorkRecipientRepository workRecipientRepository;
    private final WorkService workService;
    private final StudentService studentService;
    private final TeacherService teacherService;
    private final AlumniService alumniService;
    private final CrewService crewService;

    public List<WorkRecipient> findAll() {
        return workRecipientRepository.findAll();
    }

    public WorkRecipient findById(Long id) {
        return workRecipientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Data pemilik karya id " + id + " tidak ditemukan"));
    }

    public List<WorkRecipient> findByWorkId(Long workId) {
        return workRecipientRepository.findByWorkId(workId);
    }

    public WorkRecipient create(Long workId, Long studentId, Long teacherId, Long alumniId, Long crewId) {
        Work work = workService.findById(workId);

        Student student = studentId != null ? studentService.findById(studentId) : null;
        Teacher teacher = teacherId != null ? teacherService.findById(teacherId) : null;
        Alumni alumni = alumniId != null ? alumniService.findByStudentId(alumniId) : null;
        Crew crew = crewId != null ? crewService.findById(crewId) : null;

        WorkRecipient recipient = WorkRecipient.builder()
                .work(work)
                .student(student)
                .teacher(teacher)
                .alumni(alumni)
                .crew(crew)
                .build();

        return workRecipientRepository.save(recipient);
    }

    public void delete(Long id) {
        WorkRecipient existing = findById(id);
        workRecipientRepository.delete(existing);
    }
}
