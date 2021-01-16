package de.nak.telegram_home_assistant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SpringBootApplication
public class AccessingHomeBotDB extends SpringBootServletInitializer {

	@Bean
	public HandlerExceptionResolver handlerExceptionResolver() {
		return new HandlerExceptionResolver() {

			@Override
			public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
				ex.printStackTrace();
				return null;
			}
		};
	}

	/**
	 * @param args Spring boot starter
	 */
	public static void main(String[] args) {
		SpringApplication.run(AccessingHomeBotDB.class, args);
	}

}


