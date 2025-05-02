package com.enviro.assessment.inter001.johannestiyasi.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecyclingBin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Address is required")
    private String address;

    private double latitude;
    private double longitude;

    @Column(name = "waste_types")
    private String wasteTypes; // Comma-separated list of waste types

    private double capacityKg;
    private double currentFillPercentage;
}