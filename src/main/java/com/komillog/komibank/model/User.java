package com.komillog.komibank.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * A KomiBank user class
 * 
 * @author KomiLLog
 */
@Entity
public class User implements Serializable {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Userame is mandatory *")
	@Pattern(regexp = "^[a-zA-Z0-9.\\-_$@*!]{3,30}$", message = "Invalid user name")
	private String name;
	
	@NotBlank(message = "Password is mandatory *")
	@Size(min=4, message = "Your password must have at least 4 characters !")
	private String password;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE})
	@JoinTable(name="user_role",
			joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")}, 
			inverseJoinColumns={@JoinColumn(name="role_id", referencedColumnName="id")})
	private Set<Role> roles;
	
	
	/***************************************************************************
     *                                                                         *
     * Constructors                                                            *
     *                                                                         *
     **************************************************************************/
	
	/**
	 * Create a new user
	 */
	public User() {
		super();
	}
	
	/**
	 * Create a new user with the specified {@code name} and {@code password}
	 * @param name user name
	 * @param password user password
	 */
	public User(String name, String password) {
		super();
		this.name = name;
		this.password = password;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
