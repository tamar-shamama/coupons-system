package app.core.jobs;

import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.core.services.AdministratorService;

 @Component
public class ExpiredCouponsRemover extends Thread {
	

	@Autowired
	AdministratorService administratorService;

	@Override
	public void run() {

		while (true) {
			
			try {
				TimeUnit.SECONDS.sleep(3);
			} catch (InterruptedException e1) {
				break;
			}
			
			if (administratorService.removeExpiredCoupons()) {
				System.out.println();
				System.out.println("*** expired coupons detected and deleted ***");
				System.out.println();
			}
			
			try {
				TimeUnit.DAYS.sleep(1);
//				TimeUnit.MINUTES.sleep(5);
			} catch (InterruptedException e) {
				break;
			}
		}
	}

	@PostConstruct
	public void startJob() {
		this.start();
	}
	
	@PreDestroy
	public void stopJob() {
		this.interrupt();
	}

}
