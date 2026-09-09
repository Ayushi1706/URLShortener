package org.spring.linkpulse.controllers;

import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import org.spring.linkpulse.config.RateLimiterConfig;
import org.spring.linkpulse.dto.CreateLinkRequest;
import org.spring.linkpulse.dto.LinkResponse;
import org.spring.linkpulse.services.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/links")
@CrossOrigin
public class LinkController {
    @Autowired
    private LinkService linkService;
    @Autowired
    private RateLimiterConfig rateLimiterConfig;

    @PostMapping("")
    public ResponseEntity<?> createLink(
            @RequestBody CreateLinkRequest request,
            HttpServletRequest httpRequest
    ) {
        String ip = httpRequest.getRemoteAddr();
        Bucket bucket = rateLimiterConfig.resolveBucket(ip);
        if (bucket.tryConsume(1)) {
            LinkResponse linkResponse = linkService.createLink(request);
            return ResponseEntity.ok(linkResponse);
        } else{
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Rate limit exceeded. Try again in a minute.");
        }
    }
}
