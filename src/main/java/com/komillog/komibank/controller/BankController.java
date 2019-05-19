package com.komillog.komibank.controller;

import java.security.Principal;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.komillog.komibank.model.Account;
import com.komillog.komibank.model.Customer;
import com.komillog.komibank.model.Operation;
import com.komillog.komibank.security.KomiBankUserService;
import com.komillog.komibank.service.BankingService;

/**
 * Komibank main controller
 * 
 * @author KomiLLog
 */
@Controller
public class BankController {

	@Autowired
	private BankingService bankingService;
	
	@Autowired
	private KomiBankUserService userService;

	@RequestMapping("/")
	public String index() {
		return "index";
	}

	@GetMapping("/account/add")
	public String showAddAccountPage(Principal principal, Model model) {
		if(!userService.isCurrentUserAdmin()) {
			model.addAttribute("customer", bankingService.getCustomerByUserName(principal.getName()));
		}
		return "account-form";
	}
	
	@PostMapping("/account/add")
    public String saveAccount(String accountType, Double balance, String customerName, String customerEmail, 
    		Model model) {
		try {
			bankingService.openNewAccount(accountType, balance, customerName, customerEmail);
		} catch (Exception e) {
			model.addAttribute("accountAddException", e);
			return "account-form";
		}        
        return userService.isCurrentUserAdmin() ? "redirect:/accounts" : "redirect:/user/accounts";
    }
	
	@GetMapping("account/update/{code}")
    public String showUpdateAccountPage(@PathVariable("code") Long code, Principal principal, Model model) {
        Account account = bankingService.getAccount(code);
        
        if(!userService.isCurrentUserAdmin()) {
			if(!account.getCustomer().getUser().getName().equals(principal.getName())) {
				return "error/403";
			}
		}
        
        model.addAttribute("account", account);
        return "account-form";
    }
	
    @PostMapping("account/update/{code}")
	public String updateAccount(@PathVariable("code") Long accountCode, String customerName, String customerEmail, 
			Double balance,	Double interestRate, Double overdraft, Model model) {
    	try {
    		bankingService.updateAccount(accountCode, customerName, customerEmail, balance, overdraft, interestRate);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("accountUpdateException", e);
			return "account-form";
		}
        return "redirect:/account/" + accountCode;
    }
    
    @GetMapping("account/delete/{code}")
	public String deleteAccount(@PathVariable("code") Long code, Model model) {
    	try {
    		bankingService.deleteAccount(code);
		} catch (Exception e) {
			model.addAttribute("accountDeleteException", e);
			return "admin/accounts";
		}
    	return "redirect:/accounts";
    }
    
	@RequestMapping("/account/{code}")
	public String getAccounttProfilePage(@PathVariable("code") Long accountCode, 
			@RequestParam(name="pageNumber", defaultValue="1") int pageNumber,
			@RequestParam(name="pageSize", defaultValue="5") int operationPageSize,
			Principal principal, Model model) {
		try {
			Account account = bankingService.getAccount(accountCode);
			
			if(!userService.isCurrentUserAdmin()) {
				if(!account.getCustomer().getUser().getName().equals(principal.getName())) {
					return "error/403";
				}
			}
			
			model.addAttribute("account", account);

			Page<Operation> accountOperations = bankingService.getAccountOperations(accountCode, pageNumber - 1, operationPageSize);
			model.addAttribute("operations", accountOperations.getContent());
			
			if(accountOperations.getTotalPages() > 1) {
				model.addAttribute("operationsPages", IntStream.rangeClosed(1, accountOperations.getTotalPages()).toArray());
			}
		}
		catch (Exception e) {
			model.addAttribute("operationsException", e);
		}
		return "account-profile";
	}
	
	@RequestMapping("/accounts")
	public String getAccounts(String searchText, 
			@RequestParam(name="pageNumber", defaultValue="1") int pageNumber,
			@RequestParam(name="pageSize", defaultValue="5") int pageSize, Model model) {
		try {
			Page<Account> accounts = bankingService.getAccounts(searchText, pageNumber - 1, pageSize);
			model.addAttribute("accounts", accounts.getContent());
			
			if(!accounts.getContent().isEmpty()) {
				model.addAttribute("searchText", searchText);
			}
			
			if(accounts.getTotalPages() > 1) {
				model.addAttribute("accountsPages", IntStream.rangeClosed(1, accounts.getTotalPages()).toArray());
				model.addAttribute("pageSize", pageSize);
			}
		}
		catch (Exception e) {
			model.addAttribute("accountSearchException", e);
		}
		return "admin/accounts";
	}

	@GetMapping("/operation/add")
	public String showAddOperationsPage() {
		return "add-operations";
	}
	
	@PostMapping("/operation/add")
	public String saveOperation(String operationType, Long accountCode, double amount, 
			Long recipientAccountCode, Model model) {
		try {
			if (operationType.equals("Payment")) {
				bankingService.deposit(accountCode, amount);
			} 
			else if (operationType.equals("Withdraw")) {
				bankingService.withdraw(accountCode, amount);
			} 
			else if (operationType.equals("Transfert")) {
				bankingService.transfer(accountCode, recipientAccountCode, amount);
			}
		} 
		catch (Exception e) {
			model.addAttribute("operationException", e);
			return "add-operations";
		}
		return userService.isCurrentUserAdmin() ? "redirect:/accounts" : "redirect:/account/" + accountCode;
	}
	
	@RequestMapping("/customers")
	public String getCustomers(String searchText, 
			@RequestParam(name="pageNumber", defaultValue="1") int pageNumber,
			@RequestParam(name="pageSize", defaultValue="5") int pageSize, Model model) {
		try {
			Page<Customer> customers = bankingService.getCustomers(searchText, pageNumber - 1, pageSize);
			model.addAttribute("customers", customers.getContent());
			
			if(!customers.getContent().isEmpty()) {
				model.addAttribute("searchText", searchText);
			}
			
			if(customers.getTotalPages() > 1) {
				model.addAttribute("customersPages", IntStream.rangeClosed(1, customers.getTotalPages()).toArray());
				model.addAttribute("pageSize", pageSize);
			}
		}
		catch (Exception e) {
			model.addAttribute("customerSearchException", e);
		}
		return "admin/customers";
	}

    @GetMapping("customer/delete/{id}")
	public String deleteCustomer(@PathVariable("id") Long id, Model model) {
    	try {
    		bankingService.deleteCustomer(id);
		} catch (Exception e) {
			model.addAttribute("customerDeleteException", e);
			return "customers";
		}
    	return "redirect:/customers";
    }
	
	// User only
    
    @RequestMapping("user/accounts")
	public String getUserAcconts(Principal principal, Model model) {
    	Customer customer = null;
		try {
			if (principal != null) {
				customer = bankingService.getCustomerByUserName(principal.getName());
				if(customer.getAccounts().size() == 1) {
					return "redirect:/account/" + customer.getAccounts().get(0).getCode();
				}
				model.addAttribute("accounts", customer.getAccounts());
			}
		}
		catch (Exception e) {
			model.addAttribute("userAccountsException", e);
		}
		model.addAttribute("username", principal.getName());
		return "user/user-accounts";
	}
}
