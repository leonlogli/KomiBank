package com.komillog.komibank.service;

import org.springframework.data.domain.Page;

import com.komillog.komibank.model.Account;
import com.komillog.komibank.model.Operation;

/**
 * Bank business layer interface
 * 
 * @author KomiLLog
 */
public interface BankingService {

	/**
	 * Returns the account that matching the  {@code accountCode}
	 * 
	 * @param code the code of the account to get
	 * @return he account that matching the  {@code accountCode}
	 */
	public Account getAccount(Long code);
	
	/**
	 * Returns all accounts that match the specified {@code searchCriteriaText}
	 * 
	 * @param searchCriteriaText the search text criteria
	 * @param sortCriteria the sort criteria.
	 * @param pageNumber number the page
	 * @param pageSize the size of the page
	 * @return a Page of accounts
	 */
	public Page<Account> getAccounts(String searchCriteriaText, int pageNumber, int pageSize);
	
	/**
	 * Updates an account whose code matches {@code code}. Only the specified parameters of the account 
	 * will be updated, the others remain unchanged.
	 * 
	 * @param code the code of the account to update
	 * @param customerName the customer name
	 * @param customerEmail the customer email
	 * @param balance the new balance. If null, it will be set to 0
	 * @param overdraft the new overdraft (in the case of a current account). If null, it will be set to 0
	 * @param interestRate the new interest rate (in the case of a savings account). If null, it will be set to 0
	 */
	public void updateAccount(Long code,  String customerName, String customerEmail,
			Double balance, Double overdraft, Double interestRate);
	
	/**
	 * Open a new account with the specified parameters.
	 * 
	 * @param accountType acoount type. Ex : "CC" for CurrentAccount or "SA" for SavingsAccount
	 * @param newBalance the account (initial) balance. If null, it will be set to 0
	 * @param customerName the customer name
	 * @param customerEmail the customer email
	 */
	public void openNewAccount(String accountType, Double balance, String customerName, String customerEmail);
	
	/**
	 * Deletes an account whose code matches {@code code}
	 * @param code code the code of the account to delete
	 */
	public void deleteAccount(Long code);

	/**
	 * Make a transfer between two bank accounts
	 * 
	 * @param fromAccount the code of the origin account
	 * @param toAccount the code of the destination account
	 * @param amount the amount to transfert from {@code fromAccount} to {@code toAccount}
	 */
	public void transfer(Long fromAccount, Long toAccount, double amount);
	
	/**
	 * Make a withdrawal on the account that matching the  {@code accountCode}
	 * 
	 * @param accountCode code of the account
	 * @param amount the amount to withdraw
	 */
	public void withdraw(Long accountCode, double amount);
	
	/**
	 * Make a deposit on the account that matching the  {@code accountCode}
	 * 
	 * @param accountCode code of the account
	 * @param amount the amount to withdraw
	 */
	public void deposit(Long accountCode, double amount);
	
	/**
	 * Returns account operations by page with the specified parameters
	 * 
	 * @param accountCode code of the account
	 * @param pageNumber number the page
	 * @param pageSize the size of the page
	 * @return a Page of operations
	 */
	public Page<Operation> getAccountOperations(Long accountCode, int pageNumber, int pageSize);

}
