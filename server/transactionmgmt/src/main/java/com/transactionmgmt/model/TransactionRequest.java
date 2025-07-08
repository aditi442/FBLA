package com.transactionmgmt.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionRequest {
	    private Long id;
	    private String description;
	    private BigDecimal amount;
	    private String category;
	    private String type;
	    private LocalDate date;
	    private Long userId;
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
		public BigDecimal getAmount() {
			return amount;
		}
		public void setAmount(BigDecimal amount) {
			this.amount = amount;
		}
		
		public String getCategory() {
			return category;
		}
		public void setCategory(String category) {
			this.category = category;
		}
				
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public LocalDate getDate() {
			return date;
		}
		public void setDate(LocalDate date) {
			this.date = date;
		}
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		@Override
		public String toString() {
			return "TransactionRequest [id=" + id + ", description=" + description + ", amount=" + amount
					+ ", category=" + category + ", type=" + type + ", date=" + date + ", userId=" + userId + "]";
		}
		
	    

}
