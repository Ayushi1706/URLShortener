package org.spring.linkpulse.dto;

import java.time.LocalDateTime;

public record LinkResponse(
        Long id,
        String shortCode,
        String shortUrl,
        String originalUrl,
        LocalDateTime createdAt,
        LocalDateTime expiresAt,
        long clicks
) {}