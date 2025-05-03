package com.enviro.assessment.inter001.johannestiyasi.repository;

import com.enviro.assessment.inter001.johannestiyasi.model.WasteAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WasteAnalyticsRepository extends JpaRepository<WasteAnalytics, Long> {
    List<WasteAnalytics> findByDateBetweenOrderByDateAsc(LocalDate start, LocalDate end);
}