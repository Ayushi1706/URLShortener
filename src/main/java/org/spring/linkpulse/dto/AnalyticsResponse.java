package org.spring.linkpulse.dto;

import java.util.List;

public record AnalyticsResponse(
        String shortCode,
        long totalClicks,
        List<DailyCount> clicksByDay,
        List<LabeledCount> topReferrers,
        List<LabeledCount> clicksByCountry
) {}

