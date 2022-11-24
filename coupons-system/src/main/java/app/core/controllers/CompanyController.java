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
import app.core.entities.Coupon;
import app.core.entities.Coupon.Category;
import app.core.exceptions.CouponSystemException;
import app.core.services.CompanyService;


@RestController
@RequestMapping("api/company")
@CrossOrigin (origins = "http://localhost:3000")
public class CompanyController {
	
	@Autowired
	CompanyService companyService;
	
	
	/** add coupon to the database. a coupon cannot be added if it's title is the same
	 * as another coupon belong to the same company
	 * @param coupon
	 * @return the added coupon id
	 * @throws CouponSystemException
	 */
	
	@PostMapping(path = "/add/{companyId}", headers = "AUTHORIZATION")
	public int addCoupon (@RequestBody Coupon coupon, @PathVariable int companyId) {
		
		try {
			return companyService.createCoupon(coupon, companyId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	/** updates coupon. ownership cannot be change
	 * @param coupon
	 * @throws CouponSystemException
	 */
	@PutMapping(path = "/update/{companyId}", headers = "AUTHORIZATION")
	public void updateCoupon (@RequestBody Coupon coupon, @PathVariable int companyId) {
		
		try {
			this.companyService.updateCoupon(coupon, companyId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	/** delete coupon whose id was given from the database
	 * @param coupon
	 * @throws CouponSystemException
	 */
	@DeleteMapping(path = "/delete/{id}/{companyId}", headers = "AUTHORIZATION")
	public void deleteCoupon(@PathVariable int id, @PathVariable int companyId) {
		
		try {
			this.companyService.deleteCoupon(id, companyId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	
	/** get all coupons belonging to specific company
	 * @param compId
	 * @return
	 */
	@GetMapping(path = "/get/{compId}", headers = "AUTHORIZATION")
	public List<Coupon> getAllCompanyCoupons(@PathVariable int compId) {
		
		try {
			return this.companyService.getAllCompanyCoupons(compId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	

	
	
	/** get a single coupon belong to company
	 * @param couponId
	 * @param companyId
	 * @return
	 */
	@GetMapping(path = "/get/one/{couponId}/{companyId}", headers = "AUTHORIZATION")
	public Coupon getOneCoupon(@PathVariable int couponId, @PathVariable int companyId) {
		
		try {
			return this.companyService.getOneCoupon(couponId, companyId);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	@GetMapping(path = "/get/category/{category}/{companyId}" , headers = "AUTHORIZATION")
	public List<Coupon> getAllCopmanyCouponsFromCategory(@PathVariable Category category, @PathVariable int companyId) {
		
		try {
			return this.companyService.getAllCopmanyCouponsFromCategory(category, companyId);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	@GetMapping(path = "/get/{price}/{companyId}", headers = "AUTHORIZATION")
	public List<Coupon> getAllCopmanyCouponsUpToPrice(@PathVariable double price, @PathVariable int companyId) {
		
		try {
			return this.companyService.getAllCopmanyCouponsUpToPrice(price, companyId);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	@GetMapping(path = "/get/detailes/{companyId}", headers = "AUTHORIZATION")
	public Company getCompanyDetailes(@PathVariable int companyId) {
		try {
			return this.companyService.getCompanyDetailes(companyId);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
		
		
	
	
	
	
	
	
	
	
	
	

}
