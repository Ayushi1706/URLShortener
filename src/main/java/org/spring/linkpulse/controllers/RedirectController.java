package org.spring.linkpulse.controllers;

import org.spring.linkpulse.services.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class RedirectController {
    @Autowired
    private LinkService linkService;
    @GetMapping("/{short-code}")
    public ResponseEntity<Void> redirectToOriginalUrl(
            @PathVariable("short-code") String shortCode
    ) {
        String originalUrl = linkService.getOriginalUrl(shortCode);
        if (originalUrl != null) {
            return ResponseEntity.status(302).header("Location", originalUrl).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
