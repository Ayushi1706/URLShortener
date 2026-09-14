package org.spring.linkpulse.services;

import org.spring.linkpulse.dto.AnalyticsResponse;
import org.spring.linkpulse.dto.DailyCount;
import org.spring.linkpulse.dto.LabeledCount;
import org.spring.linkpulse.exception.LinkNotFoundException;
import org.spring.linkpulse.repository.AnalyticsRepository;
import org.spring.linkpulse.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {
    @Autowired
    private AnalyticsRepository analyticsRepository;

    @Autowired
    private LinkRepository linkRepository;

    public AnalyticsResponse getAnalytics(String shortCode) {
        linkRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new LinkNotFoundException(shortCode));

        long totalClicks = analyticsRepository.countByShortCode(shortCode);

        List<DailyCount> byDay = analyticsRepository.countClicksByDay(shortCode).stream()
                .map(row -> new DailyCount(row[0].toString(), (Long) row[1]))
                .toList();

        List<LabeledCount> byReferrer = analyticsRepository.countClicksByReferrer(shortCode).stream()
                .map(row -> new LabeledCount((String) row[0], (Long) row[1]))
                .toList();

        List<LabeledCount> byCountry = analyticsRepository.countClicksByCountry(shortCode).stream()
                .map(row -> new LabeledCount((String) row[0], (Long) row[1]))
                .toList();

        return new AnalyticsResponse(shortCode, totalClicks, byDay, byReferrer, byCountry);
    }

}
