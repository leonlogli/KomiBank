package com.komillog.komibank.model;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;

/**
 * A bank customer class
 * 
 * @author KomiLLog
 */
@Entity
public class Customer implements Serializable {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Customer name is mandatory")
	private String name;
	
	@NotBlank(message = "Customer email is mandatory")
	@Column(unique=true)
	private String email;
	
	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private List<Account> accounts;
	
	@OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="user_id", unique = true)
	private User user;
	
	
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
	
	/**
	 * Returns initials of this Customer's name as string
	 * @return initials of this Customer's name as string
	 */
	public String nameInitials() {
		return Arrays.stream(getName().split("\\s+")).map(i -> i.substring(0, 1)).collect(Collectors.joining());
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
