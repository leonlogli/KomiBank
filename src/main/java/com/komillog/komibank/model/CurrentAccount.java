package com.komillog.komibank.model;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * Current Account
 * 
 * @author KomiLLog
 */
@Entity
@DiscriminatorValue("CA")
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
	 * @param customer the customer who owns this account
	 * @param balance account balance
	 * @param creationDate the account creation date
	 * @param overdraft account's overdraft
	 */
	public CurrentAccount(Customer customer, double balance, Date creationDate, double overdraft) {
		super(customer, balance, creationDate);
		this.overdraft = overdraft;
	}
	
	/***
	 * {@inheritDoc}
	 */
	@Override
	public String type() {
		return "Current Account";
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
