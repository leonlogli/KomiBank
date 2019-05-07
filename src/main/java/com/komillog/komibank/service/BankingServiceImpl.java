package com.komillog.komibank.service;

import java.util.Date;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.komillog.komibank.dao.AccountDao;
import com.komillog.komibank.dao.OperationDao;
import com.komillog.komibank.model.Account;
import com.komillog.komibank.model.CurrentAccount;
import com.komillog.komibank.model.Operation;
import com.komillog.komibank.model.Payment;
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

}
