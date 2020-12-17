package de.nak.web_cloud.homebot;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig extends WebMvcConfigurationSupport {

	/**
	 * @return Swagger Docket
	 */
	@Bean
	public Docket productApi() {
		return new Docket(DocumentationType.SWAGGER_2).select().apis(
				RequestHandlerSelectors.basePackage("de.nak.web_cloud.homebot.controller")).paths(PathSelectors.any()).build().apiInfo(
				metaData()).tags(new Tag("controller-users", "Rest-Controller für HomeAssistantModule."));
	}
	/**
	 *   Allgemeine Meta-Daten.
	 */
	private ApiInfo metaData() {
		return new ApiInfoBuilder()
				       .title("Rest-Service HomeAssistantModule")
				       .description("User und Modulverwaltung." )
				       .version("")
				       .license("Keine Öffentliche Lizenz: Nur zur internen Verwendung.")
				       .licenseUrl("")
				       .contact(new Contact("", "", ""))
				       .build();
	}
	/**
	 *
	 * @param registry ResourceHandler
	 */
	@Override
	protected void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("swagger-ui.html")
				.addResourceLocations("classpath:/META-INF/resources/");

		registry.addResourceHandler("/webjars/**")
				.addResourceLocations("classpath:/META-INF/resources/webjars/");
	}
}
