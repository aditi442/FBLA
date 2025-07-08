package com.transactionmgmt.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.transactionmgmt.entity.Transaction;
import com.transactionmgmt.model.TransactionUpdateDTO;

public interface TransactionService {
	public Transaction addTransaction(Transaction transaction);

	public Optional<Transaction> getTransaction(Long transactionId);
	
	public List<Transaction> getUserTransactions(Long userId);

	public List<Transaction> searchTransactions(Long userId, String searchTerm);
	
	public Transaction updateTransaction(TransactionUpdateDTO update);
	
	public void deleteTransaction(Long id);
	
	public List<Transaction> filterTransactions(LocalDate startDate, LocalDate endDate, String category); 
	
	public List<Transaction> filterTransactions(Long userId, LocalDate startDate, LocalDate endDate, String category); 
}