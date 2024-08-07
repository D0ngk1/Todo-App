package dev.daryl.todo_app.security_configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/dist/todo-app/browser/**")
                .addResourceLocations("classpath:/static/dist/todo-app/browser/");
        registry.addResourceHandler("/media/**")
                .addResourceLocations("classpath:/static/dist/todo-app/browser/media/");
        registry.addResourceHandler("/assets/**")
                .addResourceLocations("classpath:/static/dist/todo-app/browser/assets/");
    }
}
