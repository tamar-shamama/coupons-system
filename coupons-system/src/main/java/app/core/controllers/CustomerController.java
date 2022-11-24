package app.core.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.entities.Coupon;
import app.core.entities.Coupon.Category;
import app.core.entities.Customer;
import app.core.exceptions.CouponSystemException;
import app.core.services.CustomerService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin (origins = "http://localhost:3000")
public class CustomerController {
	
	
	@Autowired
	CustomerService customerService;
	
	
	
	/** buy a coupon by customer
	 * @param couponId
	 * @param customerId
	 * @return coupon
	 */
	@GetMapping(path = "/buy/{couponId}/{customerId}", headers = "AUTHORIZATION")
	public Coupon buyCoupon (@PathVariable int couponId, @PathVariable int customerId) {
		
		try {
			Coupon coupon = this.customerService.buyCoupon(couponId, customerId);
			return coupon;
			
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	


	/** get one coupon belong to logged customer
	 * @param customerId
	 * @param couponId
	 * @return
	 */
	@GetMapping(path = "/getOne/{customerId}/{couponId}", headers = "AUTHORIZATION")
	public Coupon getOneCoupon(@PathVariable int customerId, @PathVariable int couponId) {
		try {
			return this.customerService.getOne(customerId, couponId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	/** get all coupons belong to logged customer
	 * @param customerId
	 * @return
	 */
	@GetMapping(path = "/getAll/{customerId}", headers = "AUTHORIZATION")
	public List<Coupon> getAllCoupons(@PathVariable int customerId) {
		try {
			return this.customerService.getAllCoupons(customerId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	

	
	/** get one (any) coupon - not necessary belong to customer
	 * @param customerId
	 * @param couponId
	 * @return
	 */
	@GetMapping(path = "/getOne/{couponId}", headers = "AUTHORIZATION")
	public Coupon getOneCoupon(@PathVariable int couponId) {
		try {
			return this.customerService.getAnyOne(couponId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	@GetMapping (path = "/get/ownerComp/{couponId}", headers = "AUTHORIZATION")
	public String getOwnerCompany(@PathVariable int couponId) {
		try {
			return this.customerService.getOwnerCompany(couponId);
			
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	
	
	@GetMapping(path = "/get/detailes/{customerId}", headers = "AUTHORIZATION")
	public Customer getCustomerDetailes(@PathVariable int customerId) {
		try {
			return this.customerService.getCustomerDetailes(customerId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	@GetMapping(path = "/getAll", headers = "AUTHORIZATION")
	public List<Coupon> getAllExistingCoupons() {
		try {
			return this.customerService.getAllExistingCoupons();
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	@GetMapping(path = "/getAll/category/{category}", headers = "AUTHORIZATION")
	public List<Coupon> getAllExistingCouponsByCategory(@PathVariable Category category) {
		try {
			return this.customerService.getAllByCategory(category);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	@GetMapping(path = "/getAll/price/{price}", headers = "AUTHORIZATION")
	public List<Coupon> getAllExistingCouponsUpToPrice(@PathVariable double price) {
		try {
			return this.customerService.getAllExistingCouponsUpToPrice(price);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	
	
	//////////
	
	
	
	
	
	/** get all of the <strong>customer</strong>'s coupons from category
	 * <p> not used in final web
	 * @param category
	 * @param customerId
	 * @return List
	 */
	@GetMapping("/get/category/{category}/{customerId}")
	public List<Coupon> getAllCouponsByCategory(@PathVariable Category category, @PathVariable int customerId) {
		try {
			return this.customerService.getAllCouponsByCategory(category, customerId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	
	/** get all of the <strong>customer</strong>'s coupons up to price
	 * <p>not used in final web
	 * @param price
	 * @param token
	 * @return
	 */
	@GetMapping ("/get/{price}")
	public List<Coupon> getAllCouponsUpToPrice(@PathVariable double price, @RequestHeader String token) {
		try {
			return this.customerService.getAllCouponsUpToPrice(price, token);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	

}
