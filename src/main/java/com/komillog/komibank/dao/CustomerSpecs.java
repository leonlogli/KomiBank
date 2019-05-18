package com.komillog.komibank.dao;

import org.springframework.data.jpa.domain.Specification;

import com.komillog.komibank.model.Customer;


public class CustomerSpecs {
	
	public static Specification<Customer> contains(String searchText) {
		if(searchText.matches("-?\\d+(\\.\\d+)?")) { // if searchText is not a number
			final String finalText = searchText;
			return (root, query, builder) -> builder.or(
		    		builder.equal(root.get("id"), finalText));
		}
		else {
			if (!searchText.contains("%")) {
		        searchText = "%" + searchText + "%";
		    }
		    String finalText = searchText;
		    return (root, query, builder) -> builder.or(
		    		builder.like(root.get("name"), finalText),
		            builder.like(root.get("email"), finalText));
		}
	}
}
