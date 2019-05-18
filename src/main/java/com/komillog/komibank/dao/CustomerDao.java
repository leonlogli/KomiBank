package com.komillog.komibank.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.komillog.komibank.model.Customer;


public interface CustomerDao extends JpaRepository<Customer, Long>, JpaSpecificationExecutor<Customer> {
	
	@Query("select c from Customer c where c.user.name=:username")
	Optional<Customer> getCustomerByUserName(@Param("username") String username);
	
}
