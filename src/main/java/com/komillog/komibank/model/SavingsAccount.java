package com.komillog.komibank.model;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * Savings Account
 * 
 * @author KomiLLog
 */
@Entity
@DiscriminatorValue("SA")
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
	 * @param customer the customer who owns this account
	 * @param balance account balance
	 * @param creationDate the account creation date
	 * @param interestRate the interest rate of the account
	 */
	public SavingsAccount(Customer customer, double balance, Date creationDate, double interestRate) {
		super(customer, balance, creationDate);
		this.interestRate = interestRate;
	}
	
	/***
	 * {@inheritDoc}
	 */
	@Override
	public String type() {
		return "Savings Account";
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
