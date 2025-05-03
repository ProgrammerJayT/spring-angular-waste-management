package com.enviro.assessment.inter001.johannestiyasi.service;

import com.enviro.assessment.inter001.johannestiyasi.model.WasteType;
import com.enviro.assessment.inter001.johannestiyasi.repository.WasteTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WasteTypeService {

    private final WasteTypeRepository wasteTypeRepository;

    public List<WasteType> getAllWasteTypes() {
        return wasteTypeRepository.findAll();
    }

    public Optional<WasteType> getWasteTypeById(Long id) {
        return wasteTypeRepository.findById(id);
    }

    public List<WasteType> getWasteTypesByRecyclable(boolean recyclable) {
        return wasteTypeRepository.findByRecyclable(recyclable);
    }

    public WasteType saveWasteType(WasteType wasteType) {
        return wasteTypeRepository.save(wasteType);
    }

    public void deleteWasteType(Long id) {
        wasteTypeRepository.deleteById(id);
    }
}