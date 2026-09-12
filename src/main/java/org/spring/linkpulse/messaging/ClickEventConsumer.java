package org.spring.linkpulse.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.spring.linkpulse.models.ClickEvent;
import org.spring.linkpulse.models.ClickEventEntity;
import org.spring.linkpulse.repository.ClickEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClickEventConsumer {
    @Autowired
    private ClickEventRepository clickEventRepository;

    @KafkaListener(topics = "click-events", groupId = "linkpulse-analytics")
    public void consume(ClickEvent clickEvent) {
        ClickEventEntity clickEventEntity = new ClickEventEntity(clickEvent);
        clickEventRepository.save(clickEventEntity);
        log.info("Saved click event for short code: {}", clickEvent.getShortCode());
    }
}
