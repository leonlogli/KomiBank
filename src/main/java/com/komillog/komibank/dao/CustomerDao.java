package com.komillog.komibank.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.komillog.komibank.model.Customer;


public interface CustomerDao extends JpaRepository<Customer, Long>{
	List<Customer> findByName(String name);
}
