package com.komillog.komibank.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.komillog.komibank.model.User;


public interface UserDao extends JpaRepository<User, Long> {

	Optional<User> findByName(String name);

}
