package com.komillog.komibank.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.komillog.komibank.model.Account;


public interface AccountDao extends JpaRepository<Account, Long>{

}
