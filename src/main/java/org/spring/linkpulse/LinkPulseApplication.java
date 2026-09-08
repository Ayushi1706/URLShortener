package org.spring.linkpulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class LinkPulseApplication {

    public static void main(String[] args) {
        SpringApplication.run(LinkPulseApplication.class, args);
    }

}
