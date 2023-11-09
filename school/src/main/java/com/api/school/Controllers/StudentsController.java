package com.api.school.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import com.api.school.Models.Student;
import com.api.school.records.students.StudentRecord;
import com.api.school.repo.StudentsRepo;

@RestController
@RequestMapping("students")

public class StudentsController {

    @Autowired
    private StudentsRepo studentRepo;

    // METHOD: GET

    @GetMapping
    public ResponseEntity<?> getAllStudents() {
        try {
            List<Student> allStudents = studentRepo.findAll();
            System.out.println(allStudents.getClass());
            return ResponseEntity.ok(allStudents);
        } catch (Exception e) {
           String errorMessage = (e.getMessage() != null && !e.getMessage().isEmpty()) ? e.getMessage()
                        : "An unspecified error occurred while retrieving the student list.";
                return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable String id) {
        if (id != null) {
            try {
                Optional<Student> optionalStudent = studentRepo.findById(id);
                if (optionalStudent.isPresent()) {
                    Student student = optionalStudent.get();
                    return ResponseEntity.ok(student);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                String errorMessage = (e.getMessage() != null && !e.getMessage().isEmpty()) ? e.getMessage()
                        : "An unspecified error occurred while retrieving the student.";
                return ResponseEntity.badRequest().body(errorMessage);
            }
        } else {
            return ResponseEntity.badRequest().body("The 'id' query parameter is missing.");
        }
    }

    // METHOD: POST

    @PostMapping
    public ResponseEntity<?> registerStudent(@RequestBody @Valid StudentRecord data) {
        try {
            Student student = new Student(data);
            studentRepo.save(student);
            return ResponseEntity.ok(student);
        } catch (Exception e) {
            String errorMessage = (e.getMessage() != null && !e.getMessage().isEmpty()) ? e.getMessage()
                    : "Registration failed due to an unspecified error.";
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    // METHOD: PUT

    @PutMapping
    @Transactional
    public ResponseEntity<?> updateStudent(@RequestBody @Valid StudentRecord data) {
        System.out.println(data);
        if (data.id() != null) {
            try {
                Optional<Student> studentOptional = studentRepo.findById(data.id());
                if (studentOptional.isPresent()) {
                    Student student = studentOptional.get();
                    student.setEmail(data.email());
                    student.setName(data.name());
                    student.setCourse(data.course());
                    student.setAge(data.age());
                    studentRepo.save(student);
                    return ResponseEntity.ok(student);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                String errorMessage = (e.getMessage() != null && !e.getMessage().isEmpty()) ? e.getMessage()
                        : "Update failed due to an unspecified error.";
                return ResponseEntity.badRequest().body(errorMessage);
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // METHOD: DELETE

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudentById(@PathVariable String id) {
        try {
            if (id == null) {
                throw new Exception("ID must not be null");
            }
            Optional<Student> studentOptional = studentRepo.findById(id);
            if (studentOptional.isPresent()) {
                Student student = studentOptional.get();
                studentRepo.delete(student);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();

            }
        } catch (Exception e) {
            String errorMessage = (e.getMessage() != null && !e.getMessage().isEmpty()) ? e.getMessage()
                    : "Deletion failed due to an unspecified error.";
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

}
