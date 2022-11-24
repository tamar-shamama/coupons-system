package app.core.util;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import app.core.util.Client.ClientType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWT {
	
		
		private String alg = SignatureAlgorithm.HS256.getJcaName();
		
		@Value("${jwt.util.secret.key}")
		private String secret;
		
		byte[] secretDecoded;
		
		private Key key;
		
		@Value("${jwt.util.chrono.unit.number}")
		private int unitsNumber;
		
		@Value("${jwt.util.chrono.unit}")
		private String chronoUnit;
		

		
		
		/** create a key to decode the token, using the secret code and the coding algorithm.
		 * 
		 */
		@PostConstruct
		public void init() {
			secretDecoded = Base64.getDecoder().decode(secret.getBytes());
			this.key = new SecretKeySpec(secretDecoded, alg);
		}

		
		
		/** Creates a map of the logged client details
		 * @param client
		 * @return Map
		 */
		public Map<String, Object> generateMap(Client client) {
			
			Map<String, Object> claims = new HashMap<>();
			claims.put("type", client.getType());
			claims.put("id", client.getId());
			claims.put("email", client.getEmail());
			
			return claims;
		}

		
		
		/** creates the token using a map of all the non standard values
		 * @param claims
		 * @param subject
		 * @return String (token)
		 */
		public String createToken(Client client) {
			
			Map<String, Object> claims = generateMap(client);
			Instant now = Instant.now();
			Instant exp = now.plus(this.unitsNumber, ChronoUnit.valueOf(this.chronoUnit));

			String token = Jwts.builder()

					.setClaims(claims)
					.setSubject(client.getEmail())
					.setIssuedAt(Date.from(now))
					.setExpiration(Date.from(exp))
					.signWith(key)
					.compact();

			return token;
		}

		
		
		/** activates the extractAllClaims() method to get a claims from token,
		 * than creates a client object from it. throws if token invalid.
		 * @param token
		 * @return Client
		 */
		public Client extractClient(String token) {
			
			Claims claims = extractAllClaims(token);
			
			int clientId = claims.get("id", Integer.class);
			String email = claims.getSubject();
			ClientType clientType = ClientType.valueOf(claims.get("type", String.class));
			
			Client client = new Client(email, clientType, clientId);
			return client;
		}

		
		/** decode the body of the token. throws if token invalid.
		 * @param token
		 * @return Claims (decoded body of the token)
		 */
		private Claims extractAllClaims(String token) {
			
			JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(key).build();
			Jws<Claims> jws = jwtParser.parseClaimsJws(token);
			
			return jws.getBody();
		}
		
		

		public Date getTokenExp(String token) {
			return extractAllClaims(token).getExpiration();
		}

		public Date getTokenIssuedAt(String token) {
			return extractAllClaims(token).getIssuedAt();
		}
		
		
		
		public boolean isTokenExpired (String token) {
			
			try {
				getTokenExp(token);
			} catch (ExpiredJwtException e) {
				return true;
			}
			return false;
		}
		
		
		
		public boolean isTokenAdmin (String token) {
			String clientType = extractAllClaims(token).get("type").toString();
			return ClientType.ADMINISTRATOR.toString().equals(clientType);
		}
		
		public boolean isTokenCompany (String token) {
			String clientType = extractAllClaims(token).get("type").toString();
			return ClientType.COMPANY.toString().equals(clientType);
		}
		
		public boolean isTokenCustomer (String token) {
			String clientType = extractAllClaims(token).get("type").toString();
			return ClientType.CUSTOMER.toString().equals(clientType);
		}
		
		
		
		/** returns the client id taken from the token
		 * @param token
		 * @return client id
		 */
		public int getClientId (String token) {
			
			int clientId = extractAllClaims(token).get("id", Integer.class);
			return clientId;
			
			
		}
		
		
		
			
	
		

}
