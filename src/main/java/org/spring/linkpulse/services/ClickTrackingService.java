package org.spring.linkpulse.services;

import lombok.extern.slf4j.Slf4j;
import org.spring.linkpulse.models.ClickEvent;
import org.spring.linkpulse.models.ClickEventEntity;
import org.spring.linkpulse.repository.AnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ClickTrackingService {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    @Async
    public void trackClick(ClickEvent clickEvent) {
        try {
            ClickEventEntity entity = new ClickEventEntity(clickEvent);
            analyticsRepository.save(entity);
            log.info("Click tracked for short code: {}", clickEvent.getShortCode());
        } catch (Exception e) {
            log.error("Failed to save click event: {}", e.getMessage());
        }
    }
}