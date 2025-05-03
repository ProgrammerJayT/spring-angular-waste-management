package com.enviro.assessment.inter001.johannestiyasi.controller;

import com.enviro.assessment.inter001.johannestiyasi.model.WasteAnalytics;
import com.enviro.assessment.inter001.johannestiyasi.service.WasteAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class WasteAnalyticsController {

    private final WasteAnalyticsService wasteAnalyticsService;

    @GetMapping
    public ResponseEntity<List<WasteAnalytics>> getAllWasteAnalytics() {
        return ResponseEntity.ok(wasteAnalyticsService.getAllWasteAnalytics());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WasteAnalytics> getWasteAnalyticsById(@PathVariable Long id) {
        return wasteAnalyticsService.getWasteAnalyticsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/daterange")
    public ResponseEntity<List<WasteAnalytics>> getWasteAnalyticsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(wasteAnalyticsService.getWasteAnalyticsByDateRange(start, end));
    }
}