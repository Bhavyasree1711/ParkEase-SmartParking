package com.parkease.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkease.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByVehicleNumber(String vehicleNumber);
}
