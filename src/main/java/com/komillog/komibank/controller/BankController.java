package com.komillog.komibank.controller;

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
import com.komillog.komibank.model.Operation;
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

	@RequestMapping("/")
	public String index() {
		return "index";
	}

	@GetMapping("/account/add")
	public String showAddAccountPage() {
		return "account-form";
	}
	
	@PostMapping("/account/add")
    public String saveAccount(String accountType, Double balance, String customerName, String customerEmail, 
    		Model model) {
		try {
			bankingService.openNewAccount(accountType, balance, customerName, customerEmail);
		} catch (Exception e) {
			model.addAttribute("${accountAddException", e);
			return "account-form";
		}        
        return "redirect:/accounts";
    }
	
	@GetMapping("account/update/{code}")
    public String showUpdateAccountPage(@PathVariable("code") Long code, Model model) {
        Account account = bankingService.getAccount(code);
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
        return "redirect:/accounts";
    }
    
    @GetMapping("account/delete/{code}")
	public String deleteAccount(@PathVariable("code") Long code, Model model) {
    	try {
    		bankingService.deleteAccount(code);
		} catch (Exception e) {
			model.addAttribute("accountDeleteException", e);
			return "accounts";
		}
    	return "redirect:/accounts";
    }
    
	@RequestMapping("/account/{code}")
	public String getAccoutProfilePage(@PathVariable("code") Long accountCode, 
			@RequestParam(name="pageNumber", defaultValue="1") int pageNumber,
			@RequestParam(name="pageSize", defaultValue="5") int operationPageSize, Model model) {
		try {
			Account account = bankingService.getAccount(accountCode);
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
	public String getAccouts(String searchText, 
			@RequestParam(name="pageNumber", defaultValue="1") int pageNumber,
			@RequestParam(name="pageSize", defaultValue="5") int pageSize, Model model) {
		try {
			System.out.println(pageSize);
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
		return "accounts";
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
		}
		return "add-operations";
	}
}
