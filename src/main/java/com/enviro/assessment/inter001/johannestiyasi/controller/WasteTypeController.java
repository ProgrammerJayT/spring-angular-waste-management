package com.enviro.assessment.inter001.johannestiyasi.controller;

import com.enviro.assessment.inter001.johannestiyasi.model.WasteType;
import com.enviro.assessment.inter001.johannestiyasi.service.WasteTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/waste-types")
@RequiredArgsConstructor
public class WasteTypeController {

    private final WasteTypeService wasteTypeService;

    @GetMapping
    public ResponseEntity<List<WasteType>> getAllWasteTypes() {
        return ResponseEntity.ok(wasteTypeService.getAllWasteTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WasteType> getWasteTypeById(@PathVariable Long id) {
        return wasteTypeService.getWasteTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/recyclable")
    public ResponseEntity<List<WasteType>> getRecyclableWasteTypes() {
        return ResponseEntity.ok(wasteTypeService.getWasteTypesByRecyclable(true));
    }

    @PostMapping
    public ResponseEntity<WasteType> createWasteType(@Valid @RequestBody WasteType wasteType) {
        return new ResponseEntity<>(wasteTypeService.saveWasteType(wasteType), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WasteType> updateWasteType(@PathVariable Long id, @Valid @RequestBody WasteType wasteType) {
        return wasteTypeService.getWasteTypeById(id)
                .map(existingWasteType -> {
                    wasteType.setId(id);
                    return ResponseEntity.ok(wasteTypeService.saveWasteType(wasteType));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWasteType(@PathVariable Long id) {
        return wasteTypeService.getWasteTypeById(id)
                .map(wasteType -> {
                    wasteTypeService.deleteWasteType(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}