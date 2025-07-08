package com.transactionmgmt.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.transactionmgmt.entity.User;
import com.transactionmgmt.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Invalid password");
        }
    }

    public User signup(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        
        // Generate a reset token and send an email
        String resetToken = generateResetToken();
        user.setToken(resetToken);
        userRepository.save(user);
        
        sendResetEmail(user.getEmail(), resetToken);
    }

    private String generateResetToken() {
        // Implement token generation logic
        return "dummy_reset_token";
    }

    private void sendResetEmail(String email, String resetToken) {
        // Implement email sending logic
    }
    
    public Optional<User> getUserByUsername(String userName) {
    	Optional<User> user = userRepository.findByUsername(userName);
    	
    	return user;
    	
    }
}
