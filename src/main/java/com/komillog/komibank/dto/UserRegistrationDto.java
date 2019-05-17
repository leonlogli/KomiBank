package com.komillog.komibank.dto;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.komillog.komibank.constraint.FieldMatch;

@FieldMatch(first = "password", second = "confirmPassword", message = "The password fields must match")
public class UserRegistrationDto {

	@NotBlank(message = "Userame is mandatory *")
	@Pattern(regexp = "^[a-zA-Z0-9.\\-_$@*!]{3,30}$", message = "Invalid user name")
	private String name;
	
	@NotBlank(message = "Password is mandatory *")
	@Size(min=4, message = "Your password must have at least 4 characters !")
	private String password;

	@NotBlank(message = "You must confirm your password !")
	@Size(min=4, message = "Your password must have at least 4 characters !")
    private String confirmPassword;

    @AssertTrue
    private Boolean terms;

    
	/***************************************************************************
     *                                                                         *
     * Setters and Getters                                                     *
     *                                                                         *
     **************************************************************************/

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Boolean getTerms() {
        return terms;
    }

    public void setTerms(Boolean terms) {
        this.terms = terms;
    }

}
