package de.nak.web_cloud.homebot;

import de.nak.web_cloud.homebot.controller.ModuleController;
import de.nak.web_cloud.homebot.controller.UserModuleController;
import de.nak.web_cloud.homebot.entity.module.ModuleRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.HandlerAdapter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

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


