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
	 * @param accountCode the code of the account to get
	 * @return he account that matching the  {@code accountCode}
	 */
	public Account getAccount(String accountCode);
	
	/**
	 * Make a transfer between two bank accounts
	 * 
	 * @param fromAccount the code of the origin account
	 * @param toAccount the code of the destination account
	 * @param amount the amount to transfert from {@code fromAccount} to {@code toAccount}
	 */
	public void transfer(String fromAccount, String toAccount, double amount);
	
	/**
	 * Make a withdrawal on the account that matching the  {@code accountCode}
	 * 
	 * @param accountCode code of the account
	 * @param amount the amount to withdraw
	 */
	public void withdraw(String accountCode, double amount);
	
	/**
	 * Make a deposit on the account that matching the  {@code accountCode}
	 * 
	 * @param accountCode code of the account
	 * @param amount the amount to withdraw
	 */
	public void deposit(String accountCode, double amount);
	
	/**
	 * Returns account operations by page with the specified parameters
	 * 
	 * @param accountCode code of the account
	 * @param pageNum number the page
	 * @param pageSize the size of the page
	 * @return account operations on the specified page
	 */
	public Page<Operation> getAccountOperations(String accountCode, int pageNum, int pageSize);
	

}
