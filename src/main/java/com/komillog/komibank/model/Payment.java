package com.komillog.komibank.model;

import java.util.Date;

/**
 * A bank Payment operation
 * 
 * @author KomiLLog
 *
 */
public class Payment extends Operation {

	/**
	 * Create a new payment operation 
	 */
	public Payment() {
		super();
	}

	/**
	 * Create a new payment operation with the specified parameters
	 * 
	 * @param amount the payment amount
	 * @param date payment date
	 * @param account the account on which the amount will be paid
	 */
	public Payment(double amount, Date date, Account account) {
		super(amount, date, account);
	}
	
	/***
	 * {@inheritDoc}
	 */
	@Override
	protected String type() {
		return "Payment";
	}
}
