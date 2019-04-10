package com.komillog.komibank.model;

import java.util.Date;

/**
 * Current Account
 * 
 * @author KomiLLog
 *
 */
public class CurrentAccount extends Account {

	private double overdraft;

	
	/***************************************************************************
     *                                                                         *
     * Constructors                                                            *
     *                                                                         *
     **************************************************************************/
	
	/**
	 * Create a new current account
	 */
	public CurrentAccount() {
		super();
	}

	/**
	 * Create a new current account with the specified parameters
	 * 
	 * @param code the code of the account
	 * @param customer the customer who owns this account
	 * @param balance account balance
	 * @param creationDate the account creation date
	 * @param overdraft account's overdraft
	 */
	public CurrentAccount(String code, Customer customer, double balance, Date creationDate, double overdraft) {
		super(code, customer, balance, creationDate);
		this.overdraft = overdraft;
	}
	
	
	/***************************************************************************
     *                                                                         *
     * Setters and Getters                                                     *
     *                                                                         *
     **************************************************************************/

	public double getOverdraft() {
		return overdraft;
	}

	public void setOverdraft(double overdraft) {
		this.overdraft = overdraft;
	}

}
