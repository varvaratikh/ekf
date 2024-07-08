package ru.train.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Конфигурационный класс для настройки OpenAPI/Swagger.
 *
 * Этот класс используется для настройки OpenAPI спецификации, которая описывает API вашего сервиса.
 *
 * Аннотация {@link Configuration} указывает, что этот класс является конфигурационным классом Spring.
 */
@Configuration
public class OpenApiConfig {
    /**
     * Настраивает экземпляр {@link OpenAPI} с пользовательской информацией о API.
     *
     * @return настроенный экземпляр {@link OpenAPI}
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Service for forecasting and formation of purchases API")
                        .version("1.0")
                        .termsOfService("http://swagger.io/terms/")
                        .contact(new Contact().name("Demyan Zverev").email("asotruzikovic@gmail.com"))
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));
    }
}
