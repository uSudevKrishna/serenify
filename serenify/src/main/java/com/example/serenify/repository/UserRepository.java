package com.example.serenify.repository;

import com.example.serenify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by their username
    Optional<User> findByUsername(String username);

    // Find a user by their email
    Optional<User> findByEmail(String email);

    // You can add other custom queries as needed, for example, find by email and password for login.
    Optional<User> findByEmailAndPassword(String email, String password);
}
