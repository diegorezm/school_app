package com.api.school.records.error;

import jakarta.validation.constraints.NotBlank;

public record ErrorMessages(
    @NotBlank(message = "Error message should not be blank") String errorMsg) {

}
