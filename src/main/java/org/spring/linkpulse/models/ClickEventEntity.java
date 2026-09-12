package org.spring.linkpulse.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "click_events")
@AllArgsConstructor
@NoArgsConstructor
public class ClickEventEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String shortCode;
    private LocalDateTime timestamp;
    private String ipAddress;
    private String userAgent;
    private String referrer;

    public ClickEventEntity(ClickEvent clickEvent) {
        this.shortCode = clickEvent.getShortCode();
        this.timestamp = clickEvent.getTimestamp();
        this.ipAddress = clickEvent.getIpAddress();
        this.userAgent = clickEvent.getUserAgent();
        this.referrer = clickEvent.getReferrer();
    }
}
