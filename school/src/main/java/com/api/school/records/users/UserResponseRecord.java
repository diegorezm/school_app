package com.api.school.records.users;

public record UserResponseRecord(
  String username,
  String email,
  Object[] roles
) {
  
}
