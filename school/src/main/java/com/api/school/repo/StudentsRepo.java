package com.api.school.repo;

import com.api.school.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentsRepo extends JpaRepository<Student, String> {
}
