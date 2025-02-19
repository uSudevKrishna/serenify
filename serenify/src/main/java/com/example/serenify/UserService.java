package com.example.serenify.service;

import com.example.serenify.model.User;
import com.example.serenify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Save or update a user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Retrieve a user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Retrieve a user by username (if your application supports unique usernames)
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Delete a user by ID
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Check if user exists (for validation)
    public boolean userExists(Long id) {
        return userRepository.existsById(id);
    }
}
