package com.api.school.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.school.infra.security.SecurityFilter;
import com.api.school.infra.security.TokenService;
import com.api.school.records.error.ErrorMessages;
import com.api.school.repo.UsersRepo;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("user")
public class UserController {
  @Autowired
  SecurityFilter securityFilter;

  @Autowired
  UsersRepo usersRepo;

  @Autowired
  TokenService tokenService;

  @GetMapping
  public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
    String token = securityFilter.recoverToken(request);
    if (token == null) {
      return ResponseEntity.status(403).build();
    }
    try {
      var subject = tokenService.validator(token);
      if (subject == null) {
        return ResponseEntity.status(403).build();
      }
      UserDetails userDTO = usersRepo.findByEmail(subject);

      if (userDTO == null) {
        return ResponseEntity.status(404).build();
      }
      
      return ResponseEntity.ok(userDTO);
    } catch (Exception e) {
      String errorMessage = (e.getMessage() != null && !e.getMessage().isEmpty()) ? e.getMessage()
          : "An unspecified error occurred while retrieving user info.";
      return ResponseEntity.status(500).body(new ErrorMessages(errorMessage));
    }
  }
}
