package org.spring.linkpulse.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.spring.linkpulse.messaging.ClickEventProducer;
import org.spring.linkpulse.models.ClickEvent;
import org.spring.linkpulse.services.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;

@RestController
@CrossOrigin
public class RedirectController {

    @Autowired
    private LinkService linkService;
    @Autowired
    private ClickEventProducer clickEventProducer;

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirectToOriginalUrl(
            @PathVariable String shortCode,
            HttpServletRequest request
    ) {
        String originalUrl = linkService.getOriginalUrl(shortCode);
        ClickEvent clickEvent = new ClickEvent(
                shortCode,
                LocalDateTime.now(),
                request.getRemoteAddr(),
                request.getHeader("User-Agent"),
                request.getHeader("Referer")
        );
        clickEventProducer.publishClickEvent(clickEvent);
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .location(URI.create(originalUrl))
                .build();
    }
}