package com.enviro.assessment.inter001.johannestiyasi.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WasteRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "User is required")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @NotNull(message = "Waste type is required")
    @ManyToOne
    @JoinColumn(name = "waste_type_id")
    private WasteType wasteType;

    @Positive(message = "Weight must be positive")
    private double weightKg;

    @Enumerated(EnumType.STRING)
    private DisposalMethod disposalMethod;

    private LocalDateTime disposedAt = LocalDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String notes;

    public enum DisposalMethod {
        RECYCLED, LANDFILL, COMPOSTED, REUSED, DONATED
    }
}