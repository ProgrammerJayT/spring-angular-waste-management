package com.enviro.assessment.inter001.johannestiyasi.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PickupSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "User is required")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Pickup date is required")
    @FutureOrPresent(message = "Pickup date must be present or future")
    private LocalDateTime pickupDate;

    @Column(name = "waste_types")
    private String wasteTypes; // Comma-separated list of waste types

    @Enumerated(EnumType.STRING)
    private PickupStatus status = PickupStatus.SCHEDULED;

    private LocalDateTime requestedAt = LocalDateTime.now();
    private LocalDateTime completedAt;

    @Column(columnDefinition = "TEXT")
    private String notes;

    public enum PickupStatus {
        SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
    }
}