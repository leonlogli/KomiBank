package com.komillog.komibank.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.komillog.komibank.model.Account;


public interface AccountDao extends JpaRepository<Account, Long>, JpaSpecificationExecutor<Account> {
	
}
