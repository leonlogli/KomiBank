package com.komillog.komibank.model;

import java.io.Serializable;
import java.util.Date;

/**
 * Abstract class for banking operations
 * 
 * @author KomiLLog
 *
 */
public abstract class Operation implements Serializable {
	
	private Long id;
	private double amount;
	private Date date;
	
	private Account account;
	

	/***************************************************************************
     *                                                                         *
     * Constructors                                                            *
     *                                                                         *
     **************************************************************************/
	
	/**
	 * Create a new operation
	 */
	public Operation() {
		super();
	}

	/**
	 * Create a new operation with the specified parameters
	 * 
	 * @param amount operation amount
	 * @param date operation date
	 * @param account the account concerned by this Operation
	 */
	public Operation(double amount, Date date, Account account) {
		super();
		this.amount = amount;
		this.date = date;
		this.account = account;
	}
	
	/***************************************************************************
     *                                                                         *
     * Abstract methods                                                       *
     *                                                                         *
     **************************************************************************/
	
	/**
	 * Returns the string representation of the operation type
	 * @return the string representation of the operation type
	 */
	protected abstract String type();
	
	
	/***************************************************************************
     *                                                                         *
     * Setters and Getters                                                     *
     *                                                                         *
     **************************************************************************/

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
	
}
