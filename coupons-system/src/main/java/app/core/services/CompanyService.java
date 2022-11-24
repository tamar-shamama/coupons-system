package app.core.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.entities.Coupon.Category;
import app.core.exceptions.CouponSystemException;
import app.core.util.JWT;

@Service
@Transactional
public class CompanyService extends ClientService {
	
	@Autowired
	JWT jwt;
	
	
	/** returns true if login was successful.
	 * @param email
	 * @param password
	 * @return boolean
	 * @throws CouponSystemException
	 */
	public boolean login (String email, String password) throws CouponSystemException {
		
		Company company = companyRepository.findByEmail(email);
		
		if (company == null) {
			throw new CouponSystemException("login failed - email and/or password incorrect");
		} else if (company.getPassword().equals(password)) { 
			return true;
		} else {
			throw new CouponSystemException("login failed - email and/or password incorrect");
		}
	}
	
	
	
	
	
	/** add coupon to the database. a coupon cannot be added if it's title is the same
	 * as another coupon belong to the same company
	 * @param coupon
	 * @param companyId
	 * @return the added coupon id
	 * @throws CouponSystemException
	 */
	public int createCoupon(Coupon coupon, int companyId) throws CouponSystemException {
		
		// if company exist
		if (!companyRepository.existsById(companyId)) {
			throw new CouponSystemException("addCoupon failed - a coupon must be created by a valid company");
		}
		
		// if name exists already
		if (couponRepository.existsByCompanyIdAndTitle(companyId, coupon.getTitle())) {
			throw new CouponSystemException("addCoupon failed - cannot add coupon with same title");
		}
		
		// set the coupon's company
		coupon.setCompany(companyRepository.findById(companyId).get());
		coupon = this.couponRepository.save(coupon);
		return coupon.getId();
	}
	
	
		
	
	/** updates coupon by receiving a new coupon from user, assign the original company
	 * to it, and replace the old coupon by it. ownership cannot be change
	 * @param coupon
	 * @throws CouponSystemException
	 */
	public void updateCoupon (Coupon coupon, int companyId) throws CouponSystemException {
		
		matchCouponToCompany(coupon, companyId);
		
		Coupon oldCoupon;
		
		if (!couponRepository.existsById(coupon.getId())) {
			throw new CouponSystemException("updateCoupon failed - coupon " + coupon.getId() + " not exist");
		}
			
		oldCoupon = couponRepository.findById(coupon.getId()).get();
			
		if (oldCoupon.getCompany().getId() != companyId) {
			throw new CouponSystemException("updateCoupon failed - cannot change owner company");
		}
		
		couponRepository.save(coupon);
	}
	
	
	
	
	
	/** get one coupon if it belong to the company whose id is given
	 * @param id
	 * @param companyId
	 * @return
	 * @throws CouponSystemException
	 */
	public Coupon getOneCoupon (int id, int companyId) throws CouponSystemException {
		
		if (couponRepository.existsByIdAndCompanyId(id, companyId)) {
			Coupon coupon = couponRepository.findById(id).get();
			return coupon;
		} else {
			throw new CouponSystemException("getOneCoupon failed - not exist");
		}
	}
	
	
	
	
	
	/** delete coupon whose id was given from the database, if it
	 * belong to logged company
	 * @param coupon
	 * @throws CouponSystemException
	 */
	public void deleteCoupon(int id, int companyId) throws CouponSystemException {
		
		Coupon c;
		
		if (!couponRepository.existsById(id)) {
			throw new CouponSystemException("deleteCoupon failed - not exist");
		} else {
			c = couponRepository.findById(id).get();
		}
		
		if (c.getCompany().getId() != companyId) {
			throw new CouponSystemException("deleteCoupon failed - cannot delete from different company!");
		}
		couponRepository.delete(c);
	}
	
	
	
	public List<Coupon> getAllCompanyCoupons(int companyId) throws CouponSystemException {
		return couponRepository.findAllByCompanyId(companyId);
	}
	
	
	
	public List<Coupon> getAllCopmanyCouponsFromCategory(Category category, int companyId) throws CouponSystemException {
		return couponRepository.findAllByCompanyIdAndCategory(companyId, category);
	}
	
	
	
	public List<Coupon> getAllCopmanyCouponsUpToPrice(double price, int companyId) throws CouponSystemException {
		return couponRepository.findAllByCompanyIdAndPriceLessThanEqual(companyId, price);
		
	}
	
	
	
	public Company getCompanyDetailes(int companyId) throws CouponSystemException {
		
		if (companyRepository.existsById(companyId)) {
			return companyRepository.findById(companyId).get();
		
		} else {
			throw new CouponSystemException("getCompanyDetailes failed - company not exist");
		}
	}
	

	
	/** set the logged company as owner to the given coupon
	 * @param coupon
	 * @throws CouponSystemException
	 */
	private void matchCouponToCompany(Coupon coupon, int companyId) throws CouponSystemException {
		
		if (!companyRepository.existsById(companyId)) {
			throw new CouponSystemException("error: company id=" + companyId + " does'nt exist");
		}
		Company loggedCompany = companyRepository.findById(companyId).get();
		coupon.setCompany(loggedCompany);
	}
	
	
	
	/** returns the company id by email (used in login)
	 * @param email
	 * @return
	 */
	public int getCompanyId (String email) {
		Company company = companyRepository.findByEmail(email);
		return company.getId();
	}

	
	
	
}
