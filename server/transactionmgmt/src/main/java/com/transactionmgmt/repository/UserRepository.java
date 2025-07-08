package com.transactionmgmt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transactionmgmt.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public Optional<User> findByUsername(String username);
	public Optional<User> findByEmail(String email);
	
}


