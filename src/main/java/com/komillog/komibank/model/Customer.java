package com.komillog.komibank.model;

import java.io.Serializable;
import java.util.List;

/**
 * A bank customer
 * 
 * @author KomiLLog
 *
 */
public class Customer implements Serializable {
	
	private Long id;
	private String name;
	private String email;
	
	private List<Account> accounts;
	
	
    /***************************************************************************
     *                                                                         *
     * Constructors                                                            *
     *                                                                         *
     **************************************************************************/
	
	/**
	 * Create a new customer
	 */
	public Customer() {
		super();
	}

	/**
	 * Create a new customer with the specified {@code name} and {@code email}
	 * 
	 * @param name customer's name
	 * @param email customer's email
	 */
	public Customer(String name, String email) {
		super();
		this.name = name;
		this.email = email;
	}
	

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<Account> accounts) {
		this.accounts = accounts;
	}
}
