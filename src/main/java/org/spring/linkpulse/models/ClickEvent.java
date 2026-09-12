package org.spring.linkpulse.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClickEvent {
    private String shortCode;
    private LocalDateTime timestamp;
    private String ipAddress;
    private String userAgent;
    private String referrer;
}
