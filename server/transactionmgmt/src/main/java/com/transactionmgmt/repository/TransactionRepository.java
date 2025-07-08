package com.transactionmgmt.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transactionmgmt.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	List<Transaction> findByUserId(Long userId);
    List<Transaction> findByUserIdAndDescriptionContainingIgnoreCase(Long userId, String description);
    List<Transaction> findByDateBetweenAndCategoryIgnoreCase(LocalDate startDate, LocalDate endDate, String category);
    List<Transaction> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<Transaction> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    List<Transaction> findByUserIdAndDateBetweenAndCategory(Long userId, LocalDate startDate, LocalDate endDate, String category);
    
}