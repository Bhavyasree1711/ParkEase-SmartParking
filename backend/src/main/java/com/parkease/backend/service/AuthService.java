package com.parkease.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.parkease.backend.entity.Role;
import com.parkease.backend.entity.User;
import com.parkease.backend.repository.UserRepository;
import com.parkease.backend.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       BCryptPasswordEncoder encoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    /* =========================
       REGISTER USER
       ========================= */
    public User register(User user) {

        // Optional: prevent duplicate vehicle numbers
        userRepository.findByVehicleNumber(user.getVehicleNumber())
                .ifPresent(u -> {
                    throw new RuntimeException("Vehicle number already registered");
                });

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    /* =========================
       LOGIN (JWT)
       ========================= */
    public String login(String vehicleNumber, String password) {

        User user = userRepository.findByVehicleNumber(vehicleNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate JWT token
        return jwtUtil.generateToken(
                user.getVehicleNumber(),
                user.getRole().name()
        );
    }
}
