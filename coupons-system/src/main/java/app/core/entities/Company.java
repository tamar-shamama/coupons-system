package app.core.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString(exclude = {"coupons", "password"})
@EqualsAndHashCode(of = "id")
public class Company {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String email;
	private String password;
	
	@OneToMany (cascade = CascadeType.ALL)
	@JoinColumn (name = "company_id")
	@JsonIgnore
	private List<Coupon> coupons = new ArrayList<>();
	
	
	
	/** create a new <strong> Coupon </strong> object and add it to the coupons {@code List}
	 * of this company
	 * @param coupon
	 */
	public void createCoupon (Coupon coupon) {
		
		if (this.coupons == null) {
			this.coupons = new ArrayList<>();
		}
		coupon.setCompany(this);
		coupons.add(coupon);
	}

}
