package app.core.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;


import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString(exclude = {"company","customers"})
public class Coupon {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private String description;
	private LocalDate startDate;
	private LocalDate expirationDate;
	private int amount;
	private double price;
	private String image;
	
	@Enumerated(EnumType.STRING)
	private Category category;
	
	@JsonIgnore
	@ManyToOne
	private Company company;
	
	@ManyToMany
	@JoinTable(
			name = "customers_vs_coupons",
			joinColumns = @JoinColumn(name = "coupon_id"),
			inverseJoinColumns = @JoinColumn(name = "customer_id")
			)
		
	@JsonIgnore
	private List<Customer> customers;
	
	
	
	
	/** buy a new coupon, meaning add the buyer (customer) to
	 * the customers {@code list} and reduce the amount of
	 * coupons by one.
	 * 
	 * @param customer
	 */
	public void buyCoupon(Customer customer) {
		
		this.amount = this.amount-1;
		if (this.customers == null) {
			this.customers = new ArrayList<>();
		}
		this.customers.add(customer);
	}
	
	
	
	public enum Category {
		VACATION, ELECTRONICS, FOOD, RESTAURANT;
	}

}
