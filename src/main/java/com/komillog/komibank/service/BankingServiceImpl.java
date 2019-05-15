package com.komillog.komibank.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.komillog.komibank.dao.AccountDao;
import com.komillog.komibank.dao.AccountSpecs;
import com.komillog.komibank.dao.CustomerDao;
import com.komillog.komibank.dao.OperationDao;
import com.komillog.komibank.model.Account;
import com.komillog.komibank.model.CurrentAccount;
import com.komillog.komibank.model.Customer;
import com.komillog.komibank.model.Operation;
import com.komillog.komibank.model.Payment;
import com.komillog.komibank.model.SavingsAccount;
import com.komillog.komibank.model.Withdrawal;

/**
 * Bank business layer implementation
 * 
 * @author KomiLLog
 */
@Service
@Transactional
public class BankingServiceImpl implements BankingService {
	
	@Autowired
	private AccountDao accountDao;
	
	@Autowired
	private CustomerDao customerDao;
	
	@Autowired
	private OperationDao operationDao;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Account getAccount(Long code) {
		return accountDao.findById(code)
				.orElseThrow(() -> new RuntimeException("Account not found ! Invalid account code " + code));
	}
	
	/** {@inheritDoc} */
	@Override
	public Page<Account> getAccounts(String searchCriteriaText, int pageNumber, int pageSize) {
		if(searchCriteriaText == null || searchCriteriaText.isBlank()) {
			return accountDao.findAll(PageRequest.of(pageNumber, pageSize));
		}
		else {
			return accountDao.findAll(AccountSpecs.contains(searchCriteriaText), 
					PageRequest.of(pageNumber, pageSize));
		}
	}

	/** {@inheritDoc} */
	@Override
	public void openNewAccount(String accountType, Double balance, String customerName, String customerEmail) {
		if(balance == null) {
			balance = 0.0;
		}
		
		if(accountType != null) {
			if(accountType.equalsIgnoreCase("Savings Account") || accountType.equalsIgnoreCase("SA")) {
				Customer customer = customerDao.save(new Customer(customerName, customerEmail));
				accountDao.save(new SavingsAccount(customer, balance, new Date(), 0));
			}
			else if(accountType.equalsIgnoreCase("Current Account") || accountType.equalsIgnoreCase("CA")) {
				Customer customer = customerDao.save(new Customer(customerName, customerEmail));
				accountDao.save(new CurrentAccount(customer, balance, new Date(), 0));
			}
			else throw new RuntimeException("Error !!! Invalid account type !");
		}
		else throw new RuntimeException("Error !!! Account type is mandatory !");
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void deleteAccount(Long code) {
		accountDao.delete(getAccount(code));
	}

	/** {@inheritDoc} */
	@Override
	public void updateAccount(Long code, String customerName, String customerEmail,
			Double balance,	Double overdraft, Double interestRate) {
		if(balance == null) {
			balance = 0.0;
		}
		if(overdraft == null) {
			overdraft = 0.0;
		}
		if(interestRate == null) {
			interestRate = 0.0;
		}
		
		Account account = getAccount(code);
		account.getCustomer().setName(customerName);
		account.getCustomer().setEmail(customerEmail);
		account.setBalance(balance);
		if (account instanceof CurrentAccount) {
			((CurrentAccount) account).setOverdraft(overdraft);
		}
		else if(account instanceof SavingsAccount) {
			((SavingsAccount) account).setInterestRate(interestRate);
		}
		// update account
		accountDao.save(account);	
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void withdraw(Long accountCode, double amount) {
		Account account = getAccount(accountCode);
		double overdraft = 0;
		
		if (account instanceof CurrentAccount) {
			overdraft = ((CurrentAccount) account).getOverdraft();
		}
		if (account.getBalance() + overdraft < amount) {
			throw new RuntimeException("Insufficient balance !");
		}
		operationDao.save(new Withdrawal(amount, new Date(), account));
		account.setBalance(account.getBalance() - amount);
		// update account
		accountDao.save(account);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void deposit(Long accountCode, double amount) {
		Account account = getAccount(accountCode);
		operationDao.save(new Payment(amount, new Date(), account));
		account.setBalance(account.getBalance() + amount);
		// update account
		accountDao.save(account);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void transfer(Long fromAccount, Long toAccount, double amount) {
		if (fromAccount.equals(toAccount)) {
			throw new RuntimeException("Error !!! account codes must be different !");
		}
		withdraw(fromAccount, amount);
		deposit(toAccount, amount);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public Page<Operation> getAccountOperations(Long accountCode, int pageNum, int pageSize) {
		return operationDao.getAccountOperations(accountCode, PageRequest.of(pageNum, pageSize));
	}
}
