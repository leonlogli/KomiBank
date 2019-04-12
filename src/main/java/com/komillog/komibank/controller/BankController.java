package com.komillog.komibank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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

}
