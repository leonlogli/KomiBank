package com.komillog.komibank.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

/**
 * Base class for all kinds of banck accounts
 * 
 * @author KomiLLog
 */

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "account_type",  discriminatorType = DiscriminatorType.STRING, length = 2)
public abstract class Account implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long code;
	private double balance;
	private Date creationDate;
	
	@ManyToOne
    @JoinColumn(name="customer_id")
	private Customer customer;
	
	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
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
	public Account(Customer customer, double balance, Date creationDate) {
		super();
		this.customer = customer;
		this.balance = balance;
		this.creationDate = creationDate;
	}
	
	/**
	 * Returns the string representation of the account type
	 * @return the string representation of the account type
	 */
	public abstract String type();
	
	
	/***************************************************************************
     *                                                                         *
     * Setters and Getters                                                     *
     *                                                                         *
     **************************************************************************/

	public Long getCode() {
		return code;
	}

	public void setCode(Long code) {
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
	
	/**
	 * Returns the code of this account formatted with at least 8 digits. If the number of digits 
	 * of the account Code is less than 8, it is completed with leading zeroes
	 * @return the formatted account code on at least 8 digits
	 */
	public String formattedCode() {
		return String.format("%0" + Math.max(8, String.valueOf(this.getCode()).length()) + "d", this.getCode());
	}
	
}
