package com.komillog.komibank.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.komillog.komibank.security.KomiBankUserService;


/**
 * User role
 * 
 * @author KomiLLog
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, proxyTargetClass = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private KomiBankUserService userService;
	
	@Autowired
	private DataSource dataSource;
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers()
        		.frameOptions().sameOrigin()
        		.and()
            .authorizeRequests()
            	.antMatchers("/css/**", "/js/**", "/images/**", "/favicon.ico", "/components/**", 
            			"/partials/**", "/signup**").permitAll()
                .antMatchers("/").permitAll()
                .antMatchers("/accounts", "/customers", "/account/delete/**").hasRole("ADMIN")
                .antMatchers("/user/accounts").hasRole("USER")
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/")
                .failureUrl("/login?error")
                .permitAll()
                .and()
            .logout()
            	.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            	.logoutSuccessUrl("/login?logout")
            	.deleteCookies("komibank-remember-me-cookie")
                .permitAll()
                .and()
             .rememberMe()
             	.rememberMeCookieName("komibank-remember-me-cookie")
             	.tokenRepository(persistentTokenRepository())
             	.tokenValiditySeconds(24 * 60 * 60) // 24h
             	.and()
            .exceptionHandling().accessDeniedPage("/403");
    }
	
	@Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }
    
    // To enable token to be saved in 'persistent_logins' table
 	@Bean
 	public PersistentTokenRepository persistentTokenRepository() {
     	JdbcTokenRepositoryImpl tokenRepositoryImpl = new JdbcTokenRepositoryImpl();
     	tokenRepositoryImpl.setDataSource(dataSource);
     	return tokenRepositoryImpl;
     }
}
