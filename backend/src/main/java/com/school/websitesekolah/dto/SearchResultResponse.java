package com.school.websitesekolah.dto;

import com.school.websitesekolah.entity.Achievement;
import com.school.websitesekolah.entity.Alumni;
import com.school.websitesekolah.entity.Facility;
import com.school.websitesekolah.entity.Student;
import com.school.websitesekolah.entity.Teacher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchResultResponse {
    private List<Student> students;
    private List<Teacher> teachers;
    private List<Achievement> achievements;
    private List<Facility> facilities;
    private List<Alumni> alumni;
}
