package com.komillog.komibank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@GetMapping("/addOperations")
	public String addOperationsPage() {
		return "add-operations";
	}
	
	@PostMapping("/addOperations")
	public String saveOperations(String operationType, String accountCode, double amount,
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
	public String accountsAdmin(String accountCode, Model model) {
		try {
			Account account = bankingService.getAccount(accountCode);
			model.addAttribute("account", account);	
			
			Page<Operation> operations = bankingService.getAccountOperations(accountCode, 0, 4);
			model.addAttribute("operations", operations.getContent());
		}
		catch (Exception e) {
			model.addAttribute("exception", e);
		}
		return "accounts-admin";
	}
	
}
