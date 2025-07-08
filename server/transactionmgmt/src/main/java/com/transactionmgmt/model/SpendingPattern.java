package com.transactionmgmt.model;

import java.math.BigDecimal;

public class SpendingPattern {
	private BigDecimal weeklySpending;
	private BigDecimal monthlySpending;
	private BigDecimal totalCurrentBalance;

	public SpendingPattern(BigDecimal weeklySpending, BigDecimal monthlySpending, BigDecimal totalCurrentBalance) {
		super();
		this.weeklySpending = weeklySpending;
		this.monthlySpending = monthlySpending;
		this.totalCurrentBalance = totalCurrentBalance;
	}

	public BigDecimal getWeeklySpending() {
		return weeklySpending;
	}

	public void setWeeklySpending(BigDecimal weeklySpending) {
		this.weeklySpending = weeklySpending;
	}

	public BigDecimal getMonthlySpending() {
		return monthlySpending;
	}

	public void setMonthlySpending(BigDecimal monthlySpending) {
		this.monthlySpending = monthlySpending;
	}

	public BigDecimal getTotalCurrentBalance() {
		return totalCurrentBalance;
	}

	public void setTotalCurrentBalance(BigDecimal totalCurrentBalance) {
		this.totalCurrentBalance = totalCurrentBalance;
	}

}
