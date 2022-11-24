package app.core.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.core.repositories.CompanyRepository;
import app.core.repositories.CouponRepository;
import app.core.repositories.CustomerRepository;

@Service
@Transactional
public class ClientService {
	
	@Autowired
	CompanyRepository companyRepository;
	@Autowired
	CouponRepository couponRepository;
	@Autowired
	CustomerRepository customerRepository;

}
