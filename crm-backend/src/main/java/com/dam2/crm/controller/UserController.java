package com.dam2.crm.controller;

import com.dam2.crm.model.User;
import com.dam2.crm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public List<User> findAll() {
        return repository.findAll();
    }

    @PostMapping
    public User create(@RequestBody User user) {
        // Encriptar contraseña antes de guardar
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }
}