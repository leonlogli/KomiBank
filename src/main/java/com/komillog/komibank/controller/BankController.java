package com.komillog.komibank.controller;

import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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

	@GetMapping("/addAccount")
	public String showAddAccountPage() {
		return "add-account";
	}
	
	@PostMapping("/addAccount")
    public String saveAccount(String customerName, String customerEmail, String accountCode, String accountType,
    		Model model) {
		try {
			bankingService.openNewAccount(customerName, customerEmail, accountCode, accountType);
		} catch (Exception e) {
			model.addAttribute("accountException", e);
		}        
        return "add-account";
    }
	
	@GetMapping("/addOperations")
	public String showAddOperationsPage() {
		return "add-operations";
	}
	
	@PostMapping("/addOperations")
	public String saveOperation(String operationType, String accountCode, double amount,
			String recipientAccountCode, Model model) {
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
	
	@RequestMapping("/accounts")
	public String accountsAdmin(String accountCode, 
			@RequestParam(name="operationPageNum", defaultValue="1") int operationPageNum,
			@RequestParam(name="operationPageSize", defaultValue="4") int operationPageSize, Model model) {
		try {
			Account account = bankingService.getAccount(accountCode);
			model.addAttribute("account", account);	
			
			Page<Operation> operations = bankingService.getAccountOperations(accountCode, operationPageNum - 1, 
					operationPageSize);
			model.addAttribute("operations", operations.getContent());
			// Add operations pages for pagination
			model.addAttribute("operationsPages", IntStream.rangeClosed(1, operations.getTotalPages()).toArray());
		}
		catch (Exception e) {
			model.addAttribute("exception", e);
		}
		return "accounts-admin";
	}
	
}
