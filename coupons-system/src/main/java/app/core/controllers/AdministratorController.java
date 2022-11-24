package app.core.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.entities.Company;
import app.core.entities.Customer;
import app.core.exceptions.CouponSystemException;
import app.core.services.AdministratorService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin (origins = "http://localhost:3000")
public class AdministratorController {
	
	@Autowired
	private AdministratorService administratorService;
	
	
	/** add a company to the database. company with already existing name or email
	 * cannot be added
	 * @param company
	 * @return the id of the added company
	 * @throws CouponSystemException
	 */
	@PostMapping(path = "/company/add", headers = "AUTHORIZATION")
	public int addCompany (@RequestBody Company company) {
		
		try {
			return this.administratorService.addCompany(company);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	/** Updates company in the database. name cannot be change
	 * @param company
	 * @throws CouponSystemException
	 */
	
	@PutMapping (path = "/company/update", headers = "AUTHORIZATION")
	public void updateCompany (@RequestBody Company company) {
		
		try {
			this.administratorService.updateCompany(company);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	/** delete the company and all of it's coupons from the database
	 * @param id
	 * @throws CouponSystemException
	 */
	
	@DeleteMapping (path = "/company/delete/{id}", headers = "AUTHORIZATION")
	public void deletCompany (@PathVariable int id) {
		try {
			this.administratorService.deleteCompany(id);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	
	
	/** returns all of the companies registered
	 * @return List
	 * @throws CouponSystemException
	 */
	
	@GetMapping (path = "/company/get", headers = "AUTHORIZATION" )
	public List<Company> getAllCompanies() {
		try {
			return this.administratorService.getAllCompanies();
		} catch (CouponSystemException e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	/** returns a company whose id was given
	 * @param id
	 * @return Company
	 * @throws CouponSystemException
	 */
	
	@GetMapping (path = "/company/get/{id}", headers = "AUTHORIZATION")
	public Company getCompany (@PathVariable int id) {
		try {
			return this.administratorService.getCompany(id);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	
	/** add a customer do the database. customer with already existing email
	 * cannot be added
	 * @param customer
	 * @return the id of the added company
	 * @throws CouponSystemException
	 */
	@PostMapping (path = "/customer/add", headers = "AUTHORIZATION")
	public int addCustomer (@RequestBody Customer customer) {
		try {
			return this.administratorService.addCustomer(customer);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	/** Updates customer in the database.
	 * @param customer
	 * @throws CouponSystemException
	 */
	@PutMapping (path = "/customer/update", headers = "AUTHORIZATION")
	public void updateCustomer (@RequestBody Customer customer) {
		try {
			this.administratorService.updateCustomer(customer);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	
	/** delete the customer and all of it's coupons from the database
	 * @param customer
	 * @throws CouponSystemException
	 */
	@DeleteMapping (path = "/customer/delete/{id}",  headers = "AUTHORIZATION")
	public void deleteCustomer (@PathVariable int id) {
		try {
			this.administratorService.deleteCustomer(id);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	
	
	
	/** returns all customers registered
	 * @return List
	 * @throws CouponSystemException
	 */
	@GetMapping (path = "/customer/get", headers = "AUTHORIZATION")
	public List<Customer> getAllCustomers() {
		try {
			return this.administratorService.getAllCustomer();
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	/** returns the customer whose id was given
	 * @param id
	 * @return Customer
	 * @throws CouponSystemException
	 */
	@GetMapping (path = "/customer/get/{id}", headers = "AUTHORIZATION")
	public Customer getCustomer(@PathVariable int id) {
		try {
			return this.administratorService.getCustomer(id);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	

}
