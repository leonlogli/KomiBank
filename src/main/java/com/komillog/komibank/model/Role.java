package com.komillog.komibank.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;

/**
 * KomiBank User role
 * 
 * @author KomiLLog
 */
@Entity
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	@NotBlank(message = "role name is mandatory")
	private String name;

	@ManyToMany(mappedBy = "roles")
	private Set<User> users;

	
	/**
	 * Create a new user role
	 */
	public Role() {
		super();
	}

	/**
	 * Create a new user role with the specified {@code name}
	 * 
	 * @param name role name
	 */
	public Role(String name) {
		super();
		this.name = name;
	}

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

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

}
