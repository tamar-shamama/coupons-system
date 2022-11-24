package app.core.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Client {
	
	public String email;
	public ClientType type;
	public int id;

	public enum ClientType {
		ADMINISTRATOR, COMPANY, CUSTOMER
	}
	

}
