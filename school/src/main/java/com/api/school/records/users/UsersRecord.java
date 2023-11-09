package com.api.school.records.users;

import com.api.school.roles.UserRoles;

import jakarta.validation.constraints.NotBlank;

public record UsersRecord(
    @NotBlank(message = "Email is required!") String email,
    @NotBlank(message = "Username is required!") String username,
    @NotBlank(message = "Password is required!") String password,
    UserRoles role
) {

}