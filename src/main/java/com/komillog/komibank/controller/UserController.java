package com.komillog.komibank.controller;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.komillog.komibank.dto.UserRegistrationDto;
import com.komillog.komibank.security.KomiBankUserService;

/**
 * Komibank user login and registration controller
 * 
 * @author KomiLLog
 */
@Controller
public class UserController {
	
    @Autowired
	private KomiBankUserService userService;


    /***************************************************************************
     *                                                                         *
     * Sign up                                                                 *
     *                                                                         *
     **************************************************************************/
	
    @ModelAttribute("user")
    public UserRegistrationDto userRegistrationDto() {
        return new UserRegistrationDto();
    }

    @GetMapping("/signup")
    public String showSignupPage(Model model) {
        return "auth/signup";
    }

    @PostMapping("/signup")
    public String signup(@ModelAttribute("user") @Valid UserRegistrationDto userDto, BindingResult result){
        if (userService.findUser(userDto.getName()) != null){ // if a user exists
            result.rejectValue("name", null, "There is already an account registered with that name");
        }
        
        if (result.hasErrors()){
        	System.out.println(result.getFieldError().toString());
            return "auth/signup";
        }

        userService.save(userDto);
        return "redirect:/signup?success";
    }
    

    /***************************************************************************
     *                                                                         *
     * Login                                                                   *
     *                                                                         *
     **************************************************************************/
	
	@RequestMapping("/login")
	public String showLoginPage() {
		return "auth/login";
	}


    /***************************************************************************
     *                                                                         *
     * Access Error (403)                                                      *
     *                                                                         *
     **************************************************************************/
	
	@GetMapping("/403")
	public String accessDenied(Model model, Principal principal) {
		if (principal != null) {
			String message = "Hi " + principal.getName() + 
					"<br>You are not authorized for the requested resource !";
			model.addAttribute("accessError", message);
		}
		return "error/403";
	}
}
