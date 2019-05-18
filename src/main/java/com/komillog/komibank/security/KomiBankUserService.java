package com.komillog.komibank.security;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.komillog.komibank.dto.UserRegistrationDto;
import com.komillog.komibank.model.User;

/**
 * Komibank User Service
 * 
 * @author KomiLLog
 */
public interface KomiBankUserService extends UserDetailsService {

    User findUser(String username);
    
    User save(UserRegistrationDto registration);
    
    User getCurrentUser();

	boolean isCurrentUserAdmin();
}
