package com.komillog.komibank.service;

import java.util.Date;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.komillog.komibank.dao.AccountDao;
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
	public Account getAccount(String accountCode) {
		Account account = null;
		try {
			account = accountDao.findById(accountCode).get();
		}
		catch (NoSuchElementException e) {
			throw new RuntimeException("Account not found !");
		}
		
		if (account == null) {
			throw new RuntimeException("Account not found !");
		}	
		return account;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void withdraw(String accountCode, double amount) {
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
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void deposit(String accountCode, double amount) {
		Account account = getAccount(accountCode);
		operationDao.save(new Payment(amount, new Date(), account));
		account.setBalance(account.getBalance() + amount);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void transfer(String fromAccount, String toAccount, double amount) {
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
	public Page<Operation> getAccountOperations(String accountCode, int pageNum, int pageSize) {
		return operationDao.getAccountOperations(accountCode, PageRequest.of(pageNum, pageSize));
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void openNewAccount(String customerName, String customerEmail, String accountCode, String accountType) {
		if (accountType == null || !(accountType.equalsIgnoreCase("CA") || accountType.equalsIgnoreCase("SA"))) {
			throw new RuntimeException("Error !!! Account type is mandatory !");
		}
		
		Account account = null;
		try {
			account = getAccount(accountCode);
		} catch (Exception e) { 
			// This block does nothing but avoid displaying "Account not found" Exception.
			// As we are creating a new account, it is useless to display this exception
		}
		
		if(account != null) {
			throw new RuntimeException("This account already exists !");
		}
		if(customerDao.findByEmail(customerEmail) != null) {
			throw new RuntimeException("The email address you entered already exists !");
		}
		
		Customer customer = customerDao.save(new Customer(customerName, customerEmail));
		if(accountType.equalsIgnoreCase("CA")) {
			accountDao.save(new CurrentAccount(accountCode, customer, 0, new Date(), 0));
		}
		else if(accountType.equalsIgnoreCase("SA")) {
			accountDao.save(new SavingsAccount(accountCode, customer, 0, new Date(), 0));
		}
	}

}
