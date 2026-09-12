package org.spring.linkpulse.messaging;

import lombok.RequiredArgsConstructor;
import org.spring.linkpulse.models.ClickEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClickEventProducer {

    private final KafkaTemplate<String, ClickEvent> kafkaTemplate;

    private static final String TOPIC = "click-events";

    public void publishClickEvent(ClickEvent event) {
        kafkaTemplate.send(TOPIC, event.getShortCode(), event)
                .whenComplete((result, ex) -> {
                    if (ex != null) {
                        System.err.println("Failed to publish click event: " + ex.getMessage());
                    }
                });
    }
}