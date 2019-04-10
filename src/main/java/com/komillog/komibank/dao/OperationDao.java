package com.komillog.komibank.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.komillog.komibank.model.Operation;


public interface OperationDao extends JpaRepository<Operation, Long>{

}
