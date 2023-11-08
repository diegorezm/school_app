package com.api.school.Controllers;

import com.api.school.Models.Student;
import com.api.school.repo.StudentsRepo;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/students")

public class StudentsController {

    private StudentsRepo studentRepo;

    public StudentsController(StudentsRepo student) {
        this.studentRepo = student;
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> allStudents = studentRepo.findAll();
        return ResponseEntity.ok(allStudents);
    }
}
