package com.transactionmgmt.service;

import java.util.Optional;

import com.transactionmgmt.entity.User;

public interface AuthService {

	public User login(String username, String password);

	public User signup(User user);

	public void forgotPassword(String email);
	
	public Optional<User> getUserByUsername(String username);
}