package com.api.school.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.api.school.repo.UsersRepo;

@RestController
@RequestMapping("/users")
public class UsersController {
  private UsersRepo repo;

  public UsersController(UsersRepo repo) {
    this.repo = repo;
  }

}
