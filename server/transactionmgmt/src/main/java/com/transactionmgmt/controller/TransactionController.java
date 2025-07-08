package com.transactionmgmt.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.transactionmgmt.entity.Transaction;
import com.transactionmgmt.entity.User;
import com.transactionmgmt.model.TransactionRequest;
import com.transactionmgmt.model.TransactionUpdateDTO;
import com.transactionmgmt.service.TransactionService;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
	@Autowired
	private TransactionService transactionService;
		
	@PostMapping
	public ResponseEntity<Transaction> addTransaction(@RequestBody TransactionRequest tRequest) {
		User user = new User();
		user.setId(tRequest.getUserId());
		Transaction transaction = new Transaction();
		transaction.setAmount(tRequest.getAmount());
		transaction.setDescription(tRequest.getDescription());
		transaction.setCategory(tRequest.getCategory());
		transaction.setDate(tRequest.getDate());
		transaction.setType(tRequest.getType());
		transaction.setUser(user);
		
		return ResponseEntity.ok(transactionService.addTransaction(transaction));
	}

	
	//@GetMapping
	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Transaction>> getTransactions(@PathVariable("id") Long userId) {
		return ResponseEntity.ok(transactionService.getUserTransactions(userId));
	}

	//@GetMapping
		@RequestMapping(value = "/{id}", method = RequestMethod.GET)
		public ResponseEntity<Optional<Transaction>> getTransaction(@PathVariable("id") Long transactionId) {
			return ResponseEntity.ok(transactionService.getTransaction(transactionId));
		}
		
	@PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody TransactionUpdateDTO updateDTO) {
        updateDTO.setId(id);
        Transaction updatedTransaction = transactionService.updateTransaction(updateDTO);
        return ResponseEntity.ok(updatedTransaction);
    }
		
	@GetMapping("/search")
	public ResponseEntity<List<Transaction>> searchTransactions(@RequestParam Long userId,
			@RequestParam String searchTerm) {
		return ResponseEntity.ok(transactionService.searchTransactions(userId, searchTerm));
	}
	
	 
	@DeleteMapping("/{id}") 
	@ResponseStatus(HttpStatus.NO_CONTENT) 
	public void deleteTransaction(@PathVariable Long id) { 
		transactionService.deleteTransaction(id); 
	}
	
	/*
	 * @GetMapping("/filter") public ResponseEntity<List<Transaction>>
	 * filterTransactions(
	 * 
	 * @RequestParam(required = false) @DateTimeFormat(iso =
	 * DateTimeFormat.ISO.DATE) LocalDate startDate,
	 * 
	 * @RequestParam(required = false) @DateTimeFormat(iso =
	 * DateTimeFormat.ISO.DATE) LocalDate endDate,
	 * 
	 * @RequestParam(required = false) String category) { List<Transaction>
	 * transactions = transactionService.filterTransactions(startDate, endDate,
	 * category); return ResponseEntity.ok(transactions); }
	 */
	 @GetMapping("/filter")
	    public ResponseEntity<List<Transaction>> filterTransactions(
	            @RequestParam Long userId,
	            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
	            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
	            @RequestParam(required = false) String category) {
	        List<Transaction> transactions = transactionService.filterTransactions(userId, startDate, endDate, category);
	        return ResponseEntity.ok(transactions);
	    }
	 
}