package com.enviro.assessment.inter001.johannestiyasi.service;

import com.enviro.assessment.inter001.johannestiyasi.model.RecyclingBin;
import com.enviro.assessment.inter001.johannestiyasi.repository.RecyclingBinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecyclingBinService {

    private final RecyclingBinRepository recyclingBinRepository;

    public List<RecyclingBin> getAllRecyclingBins() {
        return recyclingBinRepository.findAll();
    }

    public Optional<RecyclingBin> getRecyclingBinById(Long id) {
        return recyclingBinRepository.findById(id);
    }

    public List<RecyclingBin> getRecyclingBinsByWasteType(String wasteType) {
        return recyclingBinRepository.findByWasteType(wasteType);
    }

    public RecyclingBin saveRecyclingBin(RecyclingBin recyclingBin) {
        return recyclingBinRepository.save(recyclingBin);
    }

    public Optional<RecyclingBin> updateFillLevel(Long id, double fillPercentage) {
        return recyclingBinRepository.findById(id)
                .map(bin -> {
                    bin.setCurrentFillPercentage(fillPercentage);
                    return recyclingBinRepository.save(bin);
                });
    }

    public void deleteRecyclingBin(Long id) {
        recyclingBinRepository.deleteById(id);
    }
}