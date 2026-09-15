package org.spring.linkpulse.dto;


public record RegisterRequest(
       String email,
       String password
) {}