package com.transactionmgmt.service;

import java.math.BigDecimal;
import java.util.List;

import com.transactionmgmt.entity.Transaction;
import com.transactionmgmt.model.SpendingPattern;

public interface SpendingPatternService {

	public SpendingPattern getSpendingPattern() ;
	public SpendingPattern getSpendingPattern(Long userId);
    public BigDecimal calculateTotalSpending(List<Transaction> transactions) ; 
    public BigDecimal calculateTotalBalance(List<Transaction> transactions);
}
