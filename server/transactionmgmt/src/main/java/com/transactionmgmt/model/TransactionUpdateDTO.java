package com.transactionmgmt.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionUpdateDTO {
    private Long id;
    private String description;
    private String category;
    private BigDecimal amount;
    private LocalDate date;
    private String type;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
		public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Override
	public String toString() {
		return "TransactionUpdateDTO [id=" + id + ", description=" + description + ", category=" + category
				+ ", amount=" + amount + ", date=" + date + ", type=" + type + "]";
	}
	
     
    
}
