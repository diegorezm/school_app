package com.api.school.records.students;

import jakarta.validation.constraints.NotBlank;

public record StudentRecord(
        String id,
        @NotBlank(message = "Name is required!") String name,
        @NotBlank(message = "Age is required!") String age,
        @NotBlank(message = "Course is required!") String course,
        @NotBlank(message = "Email is required!") String email
) {
}
