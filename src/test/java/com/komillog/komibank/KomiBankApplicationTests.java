package com.komillog.komibank;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.komillog.komibank.dao.AccountDao;
import com.komillog.komibank.dao.CustomerDao;
import com.komillog.komibank.model.Account;
import com.komillog.komibank.model.CurrentAccount;
import com.komillog.komibank.model.Customer;
import com.komillog.komibank.model.SavingsAccount;
import com.komillog.komibank.service.BankingService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class KomiBankApplicationTests {
	
	@Autowired
	private CustomerDao customerDao;
	
	@Autowired
	private AccountDao accountDao;
	
	@Autowired
	BankingService bankingService;

	@Test
	public void contextLoads() {
		System.out.println("KomiBank Test");
	}
	
	@Test
    public void daoTest() {
		Customer leon = customerDao.save(new Customer("Léon Logli", "leon@gmail.com"));
		Customer smith = customerDao.save(new Customer("Smith Johnson", "smith@gmail.com"));
		
		Customer customerFound = customerDao.findById(leon.getId()).get();
		Customer customerFound2 = customerDao.findById(smith.getId()).get();
		
        assertNotNull(customerFound);
        assertNotNull(customerFound2);
        assertEquals(customerFound.getName(), leon.getName());
        
        CurrentAccount ca = accountDao.save(new CurrentAccount(leon, 9000, new Date(), 1000));
		SavingsAccount sa = accountDao.save(new SavingsAccount(smith, 5000, new Date(), 5.5));
		
		Account caFound = accountDao.findById(ca.getCode()).get();
		Account saFound = accountDao.findById(sa.getCode()).get();

        assertEquals(caFound.getCustomer().getEmail(), ca.getCustomer().getEmail());
        assertEquals(saFound.getCode(), 2, 0);
    }
	
	@Test
    public void testBanKService() {
		bankingService.deposit(1L, 1000);
		bankingService.deposit(2L, 3000);
		bankingService.withdraw(2L, 5000);

		assertEquals(bankingService.getAccount(1L).getBalance(), 10000, 0);
		assertEquals(bankingService.getAccount(2L).getBalance(), 3000, 0.0001);
    }
}
