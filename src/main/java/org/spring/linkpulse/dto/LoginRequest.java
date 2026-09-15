package org.spring.linkpulse.dto;

public record LoginRequest(
        String email,
        String password
) {}