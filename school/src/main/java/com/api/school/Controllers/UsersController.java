package com.api.school.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.school.Models.User;
import com.api.school.repo.UsersRepo;

@RestController
@RequestMapping("/users")
public class UsersController {
  private UsersRepo repo;

  public UsersController(UsersRepo repo) {
    this.repo = repo;
  }
   @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> allUsers = repo.findAll();
        return ResponseEntity.ok(allUsers);
    }
}
