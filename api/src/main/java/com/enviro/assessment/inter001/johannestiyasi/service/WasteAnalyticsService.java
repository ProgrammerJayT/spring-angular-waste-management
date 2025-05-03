package com.enviro.assessment.inter001.johannestiyasi.service;

import com.enviro.assessment.inter001.johannestiyasi.model.WasteAnalytics;
import com.enviro.assessment.inter001.johannestiyasi.repository.WasteAnalyticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WasteAnalyticsService {

    private final WasteAnalyticsRepository wasteAnalyticsRepository;

    public List<WasteAnalytics> getAllWasteAnalytics() {
        return wasteAnalyticsRepository.findAll();
    }

    public Optional<WasteAnalytics> getWasteAnalyticsById(Long id) {
        return wasteAnalyticsRepository.findById(id);
    }

    public List<WasteAnalytics> getWasteAnalyticsByDateRange(LocalDate start, LocalDate end) {
        return wasteAnalyticsRepository.findByDateBetweenOrderByDateAsc(start, end);
    }
}