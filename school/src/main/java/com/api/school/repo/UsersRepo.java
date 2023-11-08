package com.api.school.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.school.Models.User;

public interface UsersRepo  extends JpaRepository<User, String>{
}
