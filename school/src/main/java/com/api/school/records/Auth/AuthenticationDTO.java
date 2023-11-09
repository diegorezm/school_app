package com.api.school.records.Auth;

import jakarta.validation.constraints.NotBlank;

public record AuthenticationDTO(
    @NotBlank(message = "Email is required!") String email,
    @NotBlank(message = "Password is required!") String password) {

}
