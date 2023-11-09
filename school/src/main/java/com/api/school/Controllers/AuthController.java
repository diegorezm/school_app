package com.api.school.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.school.Models.User;
import com.api.school.infra.security.TokenService;
import com.api.school.records.Auth.AuthenticationDTO;
import com.api.school.records.token.TokenRecordDTO;
import com.api.school.records.users.UsersRecord;
import com.api.school.repo.UsersRepo;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  UsersRepo usersRepo;

  @Autowired
  TokenService tokenService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) {
    try {
      var userEmailPassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
      var auth = this.authenticationManager.authenticate(userEmailPassword);
      var token = tokenService.genToken((User) auth.getPrincipal());
      return ResponseEntity.ok(new TokenRecordDTO(token));
    } catch (Exception e) {
      return ResponseEntity.status(500).build();
    }
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody @Valid UsersRecord data) {
    try {
      if (usersRepo.findByEmail(data.email()) != null) {
        throw new Exception("User already exists.");
      }
      String encryptPasswd = new BCryptPasswordEncoder().encode(data.password());
      User newUser = new User(data.username(), encryptPasswd, data.email(), data.role());
      usersRepo.save(newUser);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      String errorMessage = (e.getMessage() != null && !e.getMessage().isEmpty()) ? e.getMessage()
          : "An unspecified error occurred while trying to create the user.";
      return ResponseEntity.status(500).body(errorMessage);
    }

  }

}
