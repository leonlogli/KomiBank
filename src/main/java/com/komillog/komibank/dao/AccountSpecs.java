package com.komillog.komibank.dao;

import org.springframework.data.jpa.domain.Specification;

import com.komillog.komibank.model.Account;


public class AccountSpecs {
	
	public static Specification<Account> contains(String searchText) {
		if(searchText.matches("-?\\d+(\\.\\d+)?")) { // if searchText is not a number
			final String finalText = searchText;
			return (root, query, builder) -> builder.or(
		    		builder.equal(root.get("code"), finalText),
		            builder.equal(root.get("balance"), finalText));
		}
		else {
			if (!searchText.contains("%")) {
		        searchText = "%" + searchText + "%";
		    }
		    String finalText = searchText;
		    return (root, query, builder) -> builder.or(
		    		builder.like(root.get("customer").get("name"), finalText),
		            builder.like(root.get("customer").get("email"), finalText));
		}
	}
}
