# Online Banking Simulator developed using Spring Boot.

This project simulates online secure banking system which lets you deposit or withdraw money, transfer money between accounts etc.

There are two roles : user and admin

- USER :
	He has a normal user rights and can create account, deposit or withdraw money.
	He can only be able to access his own accounts and profile
- ADMIN :
	As admin you have functionality to see all the customers, access all accounts, 
	view/edit/delete user transactions . But you can't see users' passwords because they are encoded
	with BCrypt algorithm

## Technologies Used

**Front-end:** Thymeleaf(a modern server-side Java template engine), Html5/CSS3, JavaScript (ES6+),Bootstrap, MDC Web, Webpack, Babel

**Back-end:** Java (OpenJDK 11), Spring Boot 2.14, Spring Data, Spring Security, Hibernate, MySQL 8, Maven

## Install instructions
1. Ensure your computer has java 11 installed on it
2. Download and install mysql (https://dev.mysql.com/downloads/installer/)
3. Run the the jar file in the dist folder of the application with **java -jar** command
4. In your browser go to localhost:8080/ and start banking after your registration
5. You can use the default users to login : 
	- ADMIN ROLE:
		**username:** admin
		**password:** admin
	- USER ROLE:
		**username:** user
		**password:** user

### Demo
![Sign up page.<br />Note that the username must not contain spaces or special characters](../images/signup.PNG?raw=true)
![Login](../images/login.PNG?raw=true)
![Account types](../images/accountTypes.PNG?raw=true)
![Open new account](../images/openNewAccount.PNG?raw=true)
![Add new banking operation](../images/addNewOperation.PNG?raw=true)
![Withdrow validation](../images/withdrawError.PNG?raw=true)
![View account details](../images/accountInfos.PNG?raw=true)
![User accounts (a user can have many accounts)](../images/usersAccount.PNG?raw=true)
![All account management page (Only admins can access this page)](../images/accountsViewAdmin.PNG?raw=true)
![Bank customers management page (Only admins can access this page)](../images/customersAdmin.PNG?raw=true)

