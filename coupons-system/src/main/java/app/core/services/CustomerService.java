package app.core.services;

import java.time.LocalDate;
import java.util.List;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.core.entities.Coupon;
import app.core.entities.Coupon.Category;
import app.core.entities.Customer;
import app.core.exceptions.CouponSystemException;
import app.core.util.JWT;

@Service
@Transactional
public class CustomerService extends ClientService {
	
	@Autowired
	JWT jwt;
	
	
	
	
	/** returns true if email and password are correct (equal to
	 * email & password on db)
	 * @param email
	 * @param password
	 * @return
	 * @throws CouponSystemException
	 */
	public boolean login (String email, String password) throws CouponSystemException {
		
		Customer customer = customerRepository.findByEmail(email);
		
		if (customer == null) {
 			throw new CouponSystemException("login failed - email and/or password incorrect");
		} else if (customer.getPassword().equals(password)) {
			return true;
		} else {
			throw new CouponSystemException("login failed - email and/or password incorrect");
		}
	}
	
	
	
	
	
	/** the customer whose id is given will buy the coupon whose id
	 * is given. the amount of said coupon will be reduced in one 
	 * @param couponId
	 * @param customerId
	 * @return
	 * @throws CouponSystemException
	 */
	public Coupon buyCoupon (int couponId, int customerId) throws CouponSystemException {
		
		// if coupon exist
		if (!couponRepository.existsById(couponId)) {
			throw new CouponSystemException("buyCoupon failed - not exist");
		}
		
		Coupon coupon = couponRepository.findById(couponId).get();
		
		// if bought already
		if (couponRepository.existsByIdAndCustomersId(couponId, customerId)) {
			throw new CouponSystemException("buyCoupon failed - bought already");
		}
		
		// if left
		if (!couponRepository.existsByIdAndAmountGreaterThan(coupon.getId(), 0)) {
			throw new CouponSystemException("buyCoupon failed - there isn't any left");
		}
		
		// if not expired
		if (couponRepository.existsByIdAndExpirationDateBefore(coupon.getId(), LocalDate.now())) {
			throw new CouponSystemException("buyCoupon failed - coupon expired");
		}
		
		// reduce amount and match customer
		coupon.buyCoupon(customerRepository.findById(customerId).get());
		couponRepository.save(coupon);
		return coupon;
	}
	
	
	
	/** returns all the coupons belonging to the customer whose
	 * id given
	 * @return List of coupons
	 * @throws CouponSystemException
	 */
	public List<Coupon> getAllCoupons(int customerId) throws CouponSystemException {
		return couponRepository.findAllByCustomersId(customerId);
	}
	
	
	
	/** returns all of the existing coupons 
	 * @return List
	 * @throws CouponSystemException
	 */
	public List<Coupon> getAllExistingCoupons() throws CouponSystemException {
		return couponRepository.findAll();
	}
	
	
	
	
	
	/** returns a coupon by id 
	 * @param couponId
	 * @return Coupon
	 * @throws CouponSystemException
	 */
	public Coupon getAnyOne(int couponId) throws CouponSystemException {
		
		if (couponRepository.existsById(couponId)) {
			Coupon coupon = couponRepository.findById(couponId).get();
			return coupon;
			
		} else {
			throw new CouponSystemException("getAnyOne failed - not found");
		}
	}
	
	
	
	
	/** returns a list of coupons by category
	 * @param category
	 * @return
	 * @throws CouponSystemException
	 */
	public List<Coupon> getAllByCategory(Category category) throws CouponSystemException {
		return couponRepository.findAllByCategory(category);
	}
	
	
	/** returns a list of coupons up to price
	 * @param price
	 * @return
	 * @throws CouponSystemException
	 */
	public List<Coupon> getAllExistingCouponsUpToPrice(double price) throws CouponSystemException {
		return couponRepository.findAllByPriceLessThanEqual(price);
	}
	
	
	
	
	/** returns customer details by id
	 * @param customerId
	 * @return
	 * @throws CouponSystemException
	 */
	public Customer getCustomerDetailes(int customerId) throws CouponSystemException {
			if (customerRepository.existsById(customerId)) {
				return customerRepository.findById(customerId).get();
			} else {
				throw new CouponSystemException("getCustomerDetailes failed - customer not exist");
			}
	}
	
	
	
	
	/** returns the name of the company that created the given coupon by id
	 * @param couponId
	 * @return String company name
	 * @throws CouponSystemException
	 */
	public String getOwnerCompany (int couponId) throws CouponSystemException {
		
		try {
			Coupon coupon = couponRepository.findById(couponId).get();
			String companyName = coupon.getCompany().getName();
			return companyName;
		} catch (Exception e) {
			throw new CouponSystemException("getOwnerCompany failed - not found");
		}
	}


	
	
	/** returns the customer id by email (used in login)
	 * @param email
	 * @return id (int)
	 */
	public int getCustomerId (String email) {
		Customer customer = customerRepository.findByEmail(email);
		return customer.getId();
	}
	
	
	
	/////// 
	
	
	
	/** get one coupon (by id) if it is belong to logged
	 * customer (by id)
	 * 
	 * <p>not used in final website
	 * @param customerId
	 * @param couponId
	 * @return
	 * @throws CouponSystemException
	 */
	public Coupon getOne(int customerId, int couponId) throws CouponSystemException {
		
		if (couponRepository.existsByIdAndCustomersId(couponId, customerId)) {
			Coupon coupon = couponRepository.findById(couponId).get();
			return coupon;
			
		} else {
			throw new CouponSystemException("getOne failed - coupon not owned");
		}
	}
	
	
	
	/** returns all the coupons by category belonging to logged customer
	 * <p> not used in final web
	 * @return List
	 * @throws CouponSystemException
	 */
	public List<Coupon> getAllCouponsByCategory(Category category, int customerId) throws CouponSystemException {
			return couponRepository.findAllByCustomersIdAndCategory(customerId, category);
	}
	
	
	/**returns all the coupons up to price belonging to logged customer
	 * <p> not used in final web
	 * @param price
	 * @param token
	 * @return List of coupons
	 * @throws CouponSystemException
	 */
	public List<Coupon> getAllCouponsUpToPrice(double price, String token) throws CouponSystemException {
			return couponRepository.findAllByCustomersIdAndPriceLessThanEqual(jwt.getClientId(token), price);
		}
	
	
	

	
	
	
	
	
	
	
	
	
	
}
