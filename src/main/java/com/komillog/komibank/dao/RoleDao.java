package com.komillog.komibank.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.komillog.komibank.model.Role;

public interface RoleDao extends JpaRepository<Role, Long> {

	Optional<Role> findByName(String name);

}
