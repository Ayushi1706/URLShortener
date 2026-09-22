package org.spring.linkpulse.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.spring.linkpulse.messaging.ClickEventProducer;
import org.spring.linkpulse.models.ClickEvent;
import org.spring.linkpulse.services.GeoLocationService;
import org.spring.linkpulse.services.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;

@RestController
@CrossOrigin
@Slf4j
public class RedirectController {

    @Autowired
    private LinkService linkService;
    @Autowired
    private GeoLocationService geoLocationService;
    @Autowired
    private ClickEventProducer clickEventProducer;
    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirectToOriginalUrl(
            @PathVariable String shortCode,
            HttpServletRequest request
    ) {
        String originalUrl = linkService.getOriginalUrl(shortCode);

        try {
            String ipAddress = request.getRemoteAddr();
            String country = geoLocationService.getCountry(ipAddress);
            ClickEvent clickEvent = new ClickEvent(
                    shortCode,
                    LocalDateTime.now(),
                    ipAddress,
                    request.getHeader("User-Agent"),
                    request.getHeader("Referer"),
                    country
            );
            clickEventProducer.publishClickEvent(clickEvent);
        } catch (Exception e) {
            log.warn("Failed to record click analytics for {}: {}", shortCode, e.getMessage());
        }

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .location(URI.create(originalUrl))
                .build();
    }
}