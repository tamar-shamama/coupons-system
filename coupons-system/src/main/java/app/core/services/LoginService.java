package app.core.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import app.core.exceptions.CouponSystemException;
import app.core.util.Client;
import app.core.util.Client.ClientType;
import app.core.util.JWT;

@Service
@Transactional
public class LoginService {
	
	@Autowired
	private JWT tokensGenerator;
	@Autowired
	private CompanyService companyService;
	@Autowired
	private CustomerService customerService;

	@Value("${admin.email}")
	private String adminEmail;
	@Value("${admin.password}")
	private String adminPassword;
	
	
	/** returns a token when given the right email & password
	 * 
	 * @param email
	 * @param password
	 * @return String (token)
	 */
	public String login (ClientType clientType, String email, String password) throws CouponSystemException {
		
		
		switch (clientType) {
		
		
		case ADMINISTRATOR:
			if (email.equals(this.adminEmail) && password.equals(this.adminPassword)) {
				return this.tokensGenerator.createToken(new Client(adminEmail, ClientType.ADMINISTRATOR, 0));
			} else {
				throw new CouponSystemException("login failed - email and/or password incorrect");
			}
				
		case COMPANY:
			if (this.companyService.login(email, password)) {
				return this.tokensGenerator.createToken(new Client(email, ClientType.COMPANY, companyService.getCompanyId(email)));
			} else {
				throw new CouponSystemException("login failed - email and/or password incorrect");
			}
			
			
		case CUSTOMER:
			if (this.customerService.login(email, password)) {
				return this.tokensGenerator.createToken(new Client(email, ClientType.CUSTOMER, customerService.getCustomerId(email)));
			} else {
				throw new CouponSystemException("login failed - email and/or password incorrect");
			}
			
		default:
			throw new CouponSystemException("login failed - try again");

				
		}
	}
	
	
	
	
	
	

}
