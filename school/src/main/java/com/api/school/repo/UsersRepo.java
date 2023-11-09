package com.api.school.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.api.school.Models.User;

public interface UsersRepo  extends JpaRepository<User, String>{
  UserDetails findByEmail(String email);
}
