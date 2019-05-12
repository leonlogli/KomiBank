package com.komillog.komibank.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.komillog.komibank.model.Account;


public interface AccountDao extends JpaRepository<Account, Long>{
	
	/**
	 * Updates the saving account with the specified parameters, in a single 'update' query. 
	 * So performance is optimized
	 * 
	 * @param code the code of the account to update
	 * @param newBalance the new balance
	 * @param newInterestRate the new interest rate
	 */
	@Modifying
	@Query("update Account account set account.balance = ?2, account.interestRate = ?3 where account.code = ?1")
	void updateSavingsAccount(Long code, double newBalance, double newInterestRate);
	
	/**
	 * Updates the current account with the specified parameters, in a single 'update' query. 
	 * So performance is optimized
	 * 
	 * @param code the code of the account to update
	 * @param newBalance the new balance
	 * @param newOverdraft the new overdraft
	 */
	@Modifying
	@Query("update Account account set account.balance = ?2, account.overdraft = ?3 where account.code = ?1")
	void updateCurrentAccount(Long code, double newBalance, double newOverdraft);
	
}
