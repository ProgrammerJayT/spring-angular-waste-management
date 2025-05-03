package com.enviro.assessment.inter001.johannestiyasi.controller;

import com.enviro.assessment.inter001.johannestiyasi.model.WasteRecord;
import com.enviro.assessment.inter001.johannestiyasi.service.WasteRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/waste-records")
@RequiredArgsConstructor
public class WasteRecordController {

    private final WasteRecordService wasteRecordService;

    @GetMapping
    public ResponseEntity<List<WasteRecord>> getAllWasteRecords() {
        return ResponseEntity.ok(wasteRecordService.getAllWasteRecords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WasteRecord> getWasteRecordById(@PathVariable Long id) {
        return wasteRecordService.getWasteRecordById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WasteRecord>> getWasteRecordsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(wasteRecordService.getWasteRecordsByUserId(userId));
    }

    @GetMapping("/user/{userId}/daterange")
    public ResponseEntity<List<WasteRecord>> getWasteRecordsByUserAndDateRange(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(wasteRecordService.getWasteRecordsByUserAndDateRange(userId, start, end));
    }

    @GetMapping("/stats/total-recycled")
    public ResponseEntity<Double> getTotalRecycledWaste() {
        return ResponseEntity.ok(wasteRecordService.getTotalRecycledWaste());
    }

    @PostMapping
    public ResponseEntity<WasteRecord> createWasteRecord(@Valid @RequestBody WasteRecord wasteRecord) {
        return new ResponseEntity<>(wasteRecordService.saveWasteRecord(wasteRecord), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WasteRecord> updateWasteRecord(@PathVariable Long id, @Valid @RequestBody WasteRecord wasteRecord) {
        return wasteRecordService.getWasteRecordById(id)
                .map(existingRecord -> {
                    wasteRecord.setId(id);
                    return ResponseEntity.ok(wasteRecordService.saveWasteRecord(wasteRecord));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWasteRecord(@PathVariable Long id) {
        return wasteRecordService.getWasteRecordById(id)
                .map(record -> {
                    wasteRecordService.deleteWasteRecord(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}