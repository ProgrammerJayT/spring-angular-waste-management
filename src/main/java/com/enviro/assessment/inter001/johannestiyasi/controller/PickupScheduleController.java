package com.enviro.assessment.inter001.johannestiyasi.controller;

import com.enviro.assessment.inter001.johannestiyasi.model.PickupSchedule;
import com.enviro.assessment.inter001.johannestiyasi.service.PickupScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/pickups")
@RequiredArgsConstructor
public class PickupScheduleController {

    private final PickupScheduleService pickupScheduleService;

    @GetMapping
    public ResponseEntity<List<PickupSchedule>> getAllPickupSchedules() {
        return ResponseEntity.ok(pickupScheduleService.getAllPickupSchedules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PickupSchedule> getPickupScheduleById(@PathVariable Long id) {
        return pickupScheduleService.getPickupScheduleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PickupSchedule>> getPickupSchedulesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(pickupScheduleService.getPickupSchedulesByUserId(userId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PickupSchedule>> getPickupSchedulesByStatus(
            @PathVariable PickupSchedule.PickupStatus status) {
        return ResponseEntity.ok(pickupScheduleService.getPickupSchedulesByStatus(status));
    }

    @GetMapping("/daterange")
    public ResponseEntity<List<PickupSchedule>> getPickupSchedulesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(pickupScheduleService.getPickupSchedulesByDateRange(start, end));
    }

    @PostMapping
    public ResponseEntity<PickupSchedule> createPickupSchedule(@Valid @RequestBody PickupSchedule pickupSchedule) {
        return new ResponseEntity<>(pickupScheduleService.savePickupSchedule(pickupSchedule), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PickupSchedule> updatePickupSchedule(@PathVariable Long id, @Valid @RequestBody PickupSchedule pickupSchedule) {
        return pickupScheduleService.getPickupScheduleById(id)
                .map(existingSchedule -> {
                    pickupSchedule.setId(id);
                    return ResponseEntity.ok(pickupScheduleService.savePickupSchedule(pickupSchedule));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<PickupSchedule> updatePickupStatus(
            @PathVariable Long id, 
            @RequestParam PickupSchedule.PickupStatus status) {
        return pickupScheduleService.updatePickupStatus(id, status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePickupSchedule(@PathVariable Long id) {
        return pickupScheduleService.getPickupScheduleById(id)
                .map(schedule -> {
                    pickupScheduleService.deletePickupSchedule(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}