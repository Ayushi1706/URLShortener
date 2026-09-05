package org.spring.linkpulse.controllers;

import org.spring.linkpulse.dto.CreateLinkRequest;
import org.spring.linkpulse.dto.LinkResponse;
import org.spring.linkpulse.services.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/links")
@CrossOrigin
public class LinkController {
    @Autowired
    private LinkService linkService;
    @PostMapping("")
    public ResponseEntity<LinkResponse> createLink(
            @RequestBody CreateLinkRequest request
    ) {
        LinkResponse linkResponse = linkService.createLink(request);
        return ResponseEntity.ok(linkResponse);
    }
}
