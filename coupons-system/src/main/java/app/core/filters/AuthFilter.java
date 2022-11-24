package app.core.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import app.core.util.Client;
import app.core.util.Client.ClientType;
import app.core.util.JWT;

@Component
public class AuthFilter implements Filter {

	private JWT jwt;

	public AuthFilter(JWT jwt) {
		super();
		this.jwt = jwt;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;

		// CORS
		httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
		httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "*");
		httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "*");
		httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "*");
		httpServletResponse.setIntHeader(HttpHeaders.ACCESS_CONTROL_MAX_AGE, 5);

		// get information about http request
		String requestPath = httpServletRequest.getRequestURI();
		String httpMethod = httpServletRequest.getMethod();

		// handle CORS preflight request
		if (httpMethod.equalsIgnoreCase(HttpMethod.OPTIONS.toString())) {
			chain.doFilter(request, response);
			return;
		}

		// handle login request
		if ((httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION) == null) && requestPath.startsWith("/login")) {
			System.out.println("==== from login request");
			chain.doFilter(request, response);
			return;
		}

		// handle images
		if ((httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION) == null) && requestPath.startsWith("/api/file/")) {
			System.out.println("==== from image request");
			chain.doFilter(request, response);
			return;
		}

		
		
		// handle non restricted request (to enable swagger)
		if ((httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION) == null) && !requestPath.startsWith("/api")) {
				System.out.println("==== from non restricted request");
				System.out.println(requestPath);
				chain.doFilter(request, response);
				return;
		}
		
		
		
		// handle not login
		if (httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION) == null) {
			httpServletResponse.sendError(HttpStatus.BAD_REQUEST.value(), "please login to continu");
			return;
		}

		
		
		// check if token is valid

		try {

			// get the token from the header
			String token = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

			// check authentication
			if (!token.startsWith("Bearer ")) {
				throw new Exception("wrong authentication schema");
			}

			// get token
			token = token.replace("Bearer ", "");

			// extract client from token
			Client client = jwt.extractClient(token);

			// check authorization for the business requests

			if (requestPath.startsWith("/api/admin")) {

				if (!(client.getType() == ClientType.ADMINISTRATOR)) {
					throw new Exception("only admin is authorizes for this request");
				}

			} else if (requestPath.startsWith("/api/company")) {

				if (!(client.getType() == ClientType.COMPANY)) {
					throw new Exception("only company is authorized for this request");
				}

			} else if (requestPath.startsWith("/api/customer")) {

				if (!(client.getType() == ClientType.CUSTOMER)) {
					throw new Exception("only customer authorized for this request");
				}
			}

			// if all is good allow the client request
			chain.doFilter(request, response);
			return;

			
			
		} catch (Exception e) {

			// handle unauthorized error
			e.printStackTrace();
			httpServletResponse.setHeader(HttpHeaders.WWW_AUTHENTICATE, "Bearer realm=\"access to admin api area\"");
			httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "you are not authorized. " + e.getMessage());
		}

	}

}
