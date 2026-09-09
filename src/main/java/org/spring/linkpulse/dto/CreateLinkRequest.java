package org.spring.linkpulse.dto;

import java.time.LocalDateTime;

public record CreateLinkRequest(String url, String customAlias, LocalDateTime expiresAt) {}
