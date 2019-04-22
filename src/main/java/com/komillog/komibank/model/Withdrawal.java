package com.komillog.komibank.model;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * A bank withdrawal operation
 * 
 * @author KomiLLog
 */
@Entity
@DiscriminatorValue("W")
public class Withdrawal extends Operation {

	/**
	 * Create a new withdrawal operation
	 */
	public Withdrawal() {
		super();
	}

	/**
	 * Create a new withdrawal operation with the specified parameters
	 * 
	 * @param amount withdrawal amount
	 * @param date withdrawal date
	 * @param account the account on which the amount will be withdrawn
	 */
	public Withdrawal(double amount, Date date, Account account) {
		super(amount, date, account);
	}
	
	/***
	 * {@inheritDoc}
	 */
	@Override
	public String type() {
		return "Withdrawal";
	}

}
