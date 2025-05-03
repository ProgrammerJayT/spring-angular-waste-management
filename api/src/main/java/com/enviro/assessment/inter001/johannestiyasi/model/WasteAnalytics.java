package com.enviro.assessment.inter001.johannestiyasi.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WasteAnalytics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private double totalWasteKg;
    private double recycledWasteKg;
    private double recyclingRate; // percentage
    private int userCount;
}