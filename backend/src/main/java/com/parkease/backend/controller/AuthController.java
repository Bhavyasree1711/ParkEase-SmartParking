package com.parkease.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.parkease.backend.entity.User;
import com.parkease.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /* =========================
       REGISTER API
       ========================= */
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    /* =========================
       LOGIN API (JWT RESPONSE)
       ========================= */
    @PostMapping("/login")
    public String login(@RequestBody User request) {
        return authService.login(
                request.getVehicleNumber(),
                request.getPassword()
        );
    }
}
