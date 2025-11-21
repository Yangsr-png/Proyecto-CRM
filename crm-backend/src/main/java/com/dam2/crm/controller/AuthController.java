package com.dam2.crm.controller;

import com.dam2.crm.model.Role;
import com.dam2.crm.model.User;
import com.dam2.crm.repository.UserRepository;
import com.dam2.crm.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        User user = User.builder()
                .nombre(request.getNombre())
                .email(request.getEmail()) // Usamos email
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        
        userRepository.save(user);
        String token = jwtService.getToken(user);
        
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        System.out.println(">>> LOGIN: " + request.getEmail());

        // Autenticamos usando el email como "principal"
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.getToken(user);

        return ResponseEntity.ok(new AuthResponse(token));
    }
}

// --- DTOs ACTUALIZADOS ---

@Data
@AllArgsConstructor
@NoArgsConstructor
class RegisterRequest {
    private String nombre;
    private String email;  // Cambiado de username a email
    private String password;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class LoginRequest {
    private String email;  // Cambiado de username a email
    private String password;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class AuthResponse {
    private String token;
}