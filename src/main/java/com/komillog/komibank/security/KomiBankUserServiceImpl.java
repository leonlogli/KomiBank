package com.komillog.komibank.security;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.komillog.komibank.dao.RoleDao;
import com.komillog.komibank.dao.UserDao;
import com.komillog.komibank.dto.UserRegistrationDto;
import com.komillog.komibank.model.Role;
import com.komillog.komibank.model.User;


/**
 * Komibank User Service Implementation
 * 
 * @author KomiLLog
 */
@Service
public class KomiBankUserServiceImpl implements KomiBankUserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		User user = userDao.findByName(userName)
				.orElseThrow(() -> new UsernameNotFoundException("Invalid username or password !"));
		
		return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(),
				KomiBankUserServiceImpl.getAuthorities(user));
	}

	private static Collection<? extends GrantedAuthority> getAuthorities(User user) {
		return user.getRoles().stream()
	            .map(role -> new SimpleGrantedAuthority(role.getName()))
	            .collect(Collectors.toList());
	}

	@Override
	public User findUser(String username) {
		return userDao.findByName(username).orElse(null);
	}

	@Override
	public User save(UserRegistrationDto registration) {
		User user = new User(registration.getName(), passwordEncoder.encode(registration.getPassword()));
		user.setRoles(Set.of(getRole("ROLE_USER")));
        return userDao.save(user);
	}
	
	/**
	 * Find the role in the database. if present, return it, else save a new role with the given {@code rolename}
	 * @param roleName role name
	 * @return Role instance
	 */
	private Role getRole(String roleName) {
		return roleDao.findByName("ROLE_USER").orElseGet(() -> roleDao.save(new Role(roleName)));
	}

	@Override
	public User getCurrentUser() {
		return findUser(SecurityContextHolder.getContext().getAuthentication().getName());
	}
	
	@Override
	public boolean isCurrentUserAdmin() {
		return SecurityContextHolder.getContext()
				.getAuthentication()
				.getAuthorities()
				.stream()
				.map(g -> g.toString()).anyMatch(role -> role.equals("ROLE_ADMIN"));
	}
}
