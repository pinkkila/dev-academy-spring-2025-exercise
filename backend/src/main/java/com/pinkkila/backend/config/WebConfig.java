package com.pinkkila.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Value("${app.frontend-uri}")
    private String frontendUri;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/electricity/**")
                .allowedOrigins(this.frontendUri)
                .allowedMethods("GET");
    }
}
