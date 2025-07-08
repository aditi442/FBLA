package com.transactionmgmt.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.transactionmgmt.entity.Transaction;
import com.transactionmgmt.exception.ResourceNotFoundException;
import com.transactionmgmt.model.TransactionUpdateDTO;
import com.transactionmgmt.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Transactional
    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getUserTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }

    public Optional<Transaction> getTransaction(Long transactionId) {
        return transactionRepository.findById(transactionId);
    }

    public void deleteTransaction(Long id) {
        Transaction transaction = transactionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));
        
        transactionRepository.delete(transaction);
    }
    
    public List<Transaction> searchTransactions(Long userId, String searchTerm) {
        return transactionRepository.findByUserIdAndDescriptionContainingIgnoreCase(userId, searchTerm);
    }
    
    public Transaction updateTransaction(TransactionUpdateDTO update) {
    	Transaction transaction = transactionRepository.findById(
        		update.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + update.getId()));

        transaction.setDescription(update.getDescription());
        transaction.setAmount(update.getAmount());
        transaction.setDate(update.getDate());
        transaction.setCategory(update.getCategory());
        transaction.setType(update.getType());

        return transactionRepository.save(transaction);
    }
    
    public List<Transaction> filterTransactions(LocalDate startDate, LocalDate endDate, String category) {
        if (startDate == null && endDate == null && (category == null || category.isEmpty())) {
            return transactionRepository.findAll();
        }
        return transactionRepository.findByDateBetweenAndCategoryIgnoreCase(
            startDate != null ? startDate : LocalDate.MIN,
            endDate != null ? endDate : LocalDate.MAX,
            category != null ? category : ""
        );
    }
    
    public List<Transaction> filterTransactions(Long userId, LocalDate startDate, LocalDate endDate, String category) {
        if (startDate == null) startDate = LocalDate.MIN;
        if (endDate == null) endDate = LocalDate.MAX;
        
        if (category != null && !category.isEmpty()) {
            return transactionRepository.findByUserIdAndDateBetweenAndCategory(userId, startDate, endDate, category);
        } else {
            return transactionRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
        }
    }
    
}