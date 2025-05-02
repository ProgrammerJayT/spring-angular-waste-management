package com.enviro.assessment.inter001.johannestiyasi.controller;

import com.enviro.assessment.inter001.johannestiyasi.model.RecyclingBin;
import com.enviro.assessment.inter001.johannestiyasi.service.RecyclingBinService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recycling-bins")
@RequiredArgsConstructor
public class RecyclingBinController {

    private final RecyclingBinService recyclingBinService;

    @GetMapping
    public ResponseEntity<List<RecyclingBin>> getAllRecyclingBins() {
        return ResponseEntity.ok(recyclingBinService.getAllRecyclingBins());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecyclingBin> getRecyclingBinById(@PathVariable Long id) {
        return recyclingBinService.getRecyclingBinById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/waste-type/{wasteType}")
    public ResponseEntity<List<RecyclingBin>> getRecyclingBinsByWasteType(@PathVariable String wasteType) {
        return ResponseEntity.ok(recyclingBinService.getRecyclingBinsByWasteType(wasteType));
    }

    @PostMapping
    public ResponseEntity<RecyclingBin> createRecyclingBin(@Valid @RequestBody RecyclingBin recyclingBin) {
        return new ResponseEntity<>(recyclingBinService.saveRecyclingBin(recyclingBin), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecyclingBin> updateRecyclingBin(@PathVariable Long id, @Valid @RequestBody RecyclingBin recyclingBin) {
        return recyclingBinService.getRecyclingBinById(id)
                .map(existingBin -> {
                    recyclingBin.setId(id);
                    return ResponseEntity.ok(recyclingBinService.saveRecyclingBin(recyclingBin));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/fill-level")
    public ResponseEntity<RecyclingBin> updateFillLevel(@PathVariable Long id, @RequestParam double fillPercentage) {
        return recyclingBinService.updateFillLevel(id, fillPercentage)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecyclingBin(@PathVariable Long id) {
        return recyclingBinService.getRecyclingBinById(id)
                .map(bin -> {
                    recyclingBinService.deleteRecyclingBin(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}