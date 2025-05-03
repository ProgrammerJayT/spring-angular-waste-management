package com.enviro.assessment.inter001.johannestiyasi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class WasteManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(WasteManagementApplication.class, args);
    }

    @RestController
    class HealthController {
        
        @GetMapping("/health")
        public Map<String, String> health() {
            Map<String, String> status = new HashMap<>();
            status.put("status", "UP");
            status.put("message", "Waste Management API is running");
            return status;
        }
    }
}