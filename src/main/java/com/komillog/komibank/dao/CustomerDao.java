package com.komillog.komibank.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.komillog.komibank.model.Customer;


public interface CustomerDao extends JpaRepository<Customer, Long>{

}
