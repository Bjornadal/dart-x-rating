package com.dartxrating.security.permission;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.PermissionEvaluator;

/**
 * Created by Andreas on 24.04.2015.
 */
@Configuration
public class PermissionEvaluatorConfig {

    @Bean
    public PermissionEvaluator permissionEvaluator() {
        CustomPermission bean = new CustomPermission();
        return bean;
    }
}
