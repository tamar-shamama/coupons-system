package app.core.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.entities.Customer;
import app.core.exceptions.CouponSystemException;


@Service
@Transactional
public class AdministratorService extends ClientService {
	
	@Autowired
	private FileStorageService fileStorageService;
	
	
	
	/** add a company to the database. company with already existing name or email
	 * cannot be added
	 * @param company
	 * @return the id of the added company
	 * @throws CouponSystemException
	 */
	public int addCompany (Company company) throws CouponSystemException {
		
		if (companyRepository.existsByName(company.getName())) {
			throw new CouponSystemException("addCompany failed - company " + company.getName() + " exists allready");
		}
		
		if (companyRepository.existsByEmail(company.getEmail())) {
			throw new CouponSystemException("addCompany failed - company " + company.getEmail() + " exists allready");
		}
		
		return companyRepository.save(company).getId();
	}
	
	
	
	/** Updates company in the database. name & email cannot be changed
	 * @param company
	 * @throws CouponSystemException
	 */
	public void updateCompany (Company company) throws CouponSystemException {
		
		
		if (!companyRepository.existsById(company.getId())) {
			throw new CouponSystemException("updateCompany failed - company " + company.getId() + " not exists");
		}
		
		Company oldComp = companyRepository.findById(company.getId()).get();
			
		if (!company.getName().equals(oldComp.getName())) {
			throw new CouponSystemException("updateCompany failed - name cannot be change");
		}
		
		if (!company.getEmail().equals(oldComp.getEmail())) {
			throw new CouponSystemException("updateCompany failed - email cannot be change");
		}
		
		companyRepository.save(company);
	}
	
	
	
	
	/** delete the company with the given id, all of it's coupons, and the clients history
	 * of those coupons, from the database
	 * @param id
	 * @throws CouponSystemException
	 */
	public void deleteCompany (int id) throws CouponSystemException {
		
		if (!companyRepository.existsById(id)) {
			throw new CouponSystemException("deleteCompany failed - company " + id + " not exists");
		}
		
		
//		// delete company's coupons' images 
		List<Coupon> compCoupons = couponRepository.findAllByCompanyId(id);
		
		for (Coupon coupon : compCoupons) {
			
			if (!coupon.getImage().equals("image")) {
				
				try {
					this.fileStorageService.deleteFile(coupon.getImage());
					
				} catch (Exception e) {
					throw new CouponSystemException("can't find image");
				}
			}
		}
		
		
		// delete company's coupons (hibernate will automatically delete the "customers_vs_coupons"
		// rows including the deleted coupons)
		couponRepository.deleteAllByCompanyId(id);
		
		// delete company
		companyRepository.delete(new Company(id, null, null, null, null));
	}
	
	
	
	/** returns all of the companies.
	 * @return List
	 * @throws CouponSystemException
	 */
	public List<Company> getAllCompanies() throws CouponSystemException {
		return companyRepository.findAll();
	}
	
	
	
	/** returns a company whose id was given
	 * @param id
	 * @return Company
	 * @throws CouponSystemException
	 */
	public Company getCompany (int id) throws CouponSystemException {
		
		Optional<Company> c = companyRepository.findById(id);
		
		if (c.isPresent()) {
			return c.get();
		} else {
			throw new CouponSystemException("getCompanyById failed - not found");
		}
	}
	
	

	/** add a customer do the database. customer with already existing email
	 * cannot be added
	 * @param customer
	 * @return the id of the added company
	 * @throws CouponSystemException
	 */
	public int addCustomer (Customer customer) throws CouponSystemException {
		
		if (customerRepository.existsByEmail(customer.getEmail())) {
			throw new CouponSystemException("addCustomer failed - customer " + customer.getEmail() + " exists allready");
		}
		return customerRepository.save(customer).getId();
	}
	
	
	
	/** Updates customer in the database.
	 * @param customer
	 * @throws CouponSystemException
	 */
	public void updateCustomer (Customer customer) throws CouponSystemException {
		
		if (!customerRepository.existsById(customer.getId())) {
			throw new CouponSystemException("updateCustomer failed - customer " + customer.getId() + " not found");
		
		} else if (!(customerRepository.findById(customer.getId()).get().getEmail()).equals(customer.getEmail())) {
			throw new CouponSystemException("updateCustomer failed - email can not be changed");
		}
		
		customerRepository.save(customer);
	}
	
	
	
	
	/** delete the customer and all of it's coupons from the database
	 * @param customer
	 * @throws CouponSystemException
	 */
	public void deleteCustomer (int id) throws CouponSystemException {
		
		if (!customerRepository.existsById(id)) {
			throw new CouponSystemException("deleteCustomer failed - customer " + id + " not exists");
		}
		// hibernate automatically deletes coupons history when 
		// the customer is deleted
		customerRepository.delete(new Customer(id, null, null, null, null, null));
	}
	
	
	
	
	/** returns all customers
	 * @return List
	 * @throws CouponSystemException
	 */
	public List<Customer> getAllCustomer() throws CouponSystemException {
		return customerRepository.findAll();
	}
	
	
	
	/** returns the customer whose id was given
	 * @param id
	 * @return Customer
	 * @throws CouponSystemException
	 */
	public Customer getCustomer (int id) throws CouponSystemException {
		
		Optional<Customer> c = customerRepository.findById(id);
		
		if (c.isPresent()) {
			return c.get();
		} else {
			throw new CouponSystemException("getCustomerById failed - not found");
		}
	}
	
	
	

	/** delete all of the expired coupons
	 * @return true if coupons were deleted
	 */
	public boolean removeExpiredCoupons() {
		
		List<Coupon> list = couponRepository.findAllByExpirationDateBefore(LocalDate.now());
		
		if (!list.isEmpty()) {
			couponRepository.deleteAll(list);
			return true;
		}
		return false;
	}
	
	
	
	
	

}
