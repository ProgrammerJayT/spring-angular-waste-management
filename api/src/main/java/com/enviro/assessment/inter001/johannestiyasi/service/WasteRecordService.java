package com.enviro.assessment.inter001.johannestiyasi.service;

import com.enviro.assessment.inter001.johannestiyasi.model.AppUser;
import com.enviro.assessment.inter001.johannestiyasi.model.WasteRecord;
import com.enviro.assessment.inter001.johannestiyasi.repository.AppUserRepository;
import com.enviro.assessment.inter001.johannestiyasi.repository.WasteRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WasteRecordService {

    private final WasteRecordRepository wasteRecordRepository;
    private final AppUserRepository appUserRepository;

    public List<WasteRecord> getAllWasteRecords() {
        return wasteRecordRepository.findAll();
    }

    public Optional<WasteRecord> getWasteRecordById(Long id) {
        return wasteRecordRepository.findById(id);
    }

    public List<WasteRecord> getWasteRecordsByUserId(Long userId) {
        return appUserRepository.findById(userId)
                .map(wasteRecordRepository::findByUser)
                .orElse(List.of());
    }

    public List<WasteRecord> getWasteRecordsByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        return appUserRepository.findById(userId)
                .map(user -> wasteRecordRepository.findByUserAndDisposedAtBetween(user, start, end))
                .orElse(List.of());
    }

    public Double getTotalRecycledWaste() {
        return wasteRecordRepository.getTotalRecycledWaste();
    }

    public WasteRecord saveWasteRecord(WasteRecord wasteRecord) {
        return wasteRecordRepository.save(wasteRecord);
    }

    public void deleteWasteRecord(Long id) {
        wasteRecordRepository.deleteById(id);
    }
}