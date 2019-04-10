package com.komillog.komibank.model;

import java.util.Date;

/**
 * Savings Account
 * 
 * @author KomiLLog
 *
 */
public class SavingsAccount extends Account {

	private double interestRate;

	/**
	 * Create a new savings account
	 */
	public SavingsAccount() {
		super();
	}
	
	/**
	 * Create a new savings account with the specified parameters
	 * 
	 * @param code the code of the account
	 * @param customer the customer who owns this account
	 * @param balance account balance
	 * @param creationDate the account creation date
	 * @param interestRate the interest rate of the account
	 */
	public SavingsAccount(String code, Customer customer, double balance, Date creationDate, double interestRate) {
		super(code, customer, balance, creationDate);
		this.interestRate = interestRate;
	}
	

	/***************************************************************************
     *                                                                         *
     * Setters and Getters                                                     *
     *                                                                         *
     **************************************************************************/

	public double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(double interestRate) {
		this.interestRate = interestRate;
	}
	
}
