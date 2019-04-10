package com.komillog.komibank.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Base class for all kinds of banck accounts
 * 
 * @author KomiLLog
 *
 */
public abstract class Account implements Serializable {

	private String code;
	private double balance;
	private Date creationDate;
	
	private Customer customer;
	
	private List<Operation> operations;
	

    /***************************************************************************
     *                                                                         *
     * Constructors                                                            *
     *                                                                         *
     **************************************************************************/
	
	/**
	 * Create new account
	 */
	public Account() {
		super();
	}

	/**
	 * Create new account with the specified parameters
	 * 
	 * @param code the code of the account
	 * @param customer the customer who owns this account
	 * @param balance account balance
	 * @param creationDate the account creation date
	 */
	public Account(String code, Customer customer, double balance, Date creationDate) {
		super();
		this.code = code;
		this.customer = customer;
		this.balance = balance;
		this.creationDate = creationDate;
	}
	
	
	/***************************************************************************
     *                                                                         *
     * Setters and Getters                                                     *
     *                                                                         *
     **************************************************************************/

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public List<Operation> getOperations() {
		return operations;
	}

	public void setOperations(List<Operation> operations) {
		this.operations = operations;
	}
	
}
