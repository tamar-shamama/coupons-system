package app.core.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.exceptions.CouponSystemException;
import app.core.services.LoginService;
import app.core.util.Client.ClientType;

@RestController
public class LoginController {
	
	@Autowired
	LoginService loginService;
	
	
	
	/** returns token if login 

	 * @param clientType
	 * @param email
	 * @param password
	 * @return String
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/login/{clientType}/{email}/{password}")
	public String login (@PathVariable ClientType clientType, @PathVariable String email, @PathVariable String password) {
		
		try {
			String token = this.loginService.login(clientType, email, password);
			return token;
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());

		}
	}
	
	
	

}
