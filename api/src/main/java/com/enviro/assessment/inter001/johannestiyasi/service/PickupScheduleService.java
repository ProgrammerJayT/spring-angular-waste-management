package com.enviro.assessment.inter001.johannestiyasi.service;

import com.enviro.assessment.inter001.johannestiyasi.model.PickupSchedule;
import com.enviro.assessment.inter001.johannestiyasi.repository.AppUserRepository;
import com.enviro.assessment.inter001.johannestiyasi.repository.PickupScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PickupScheduleService {

    private final PickupScheduleRepository pickupScheduleRepository;
    private final AppUserRepository appUserRepository;

    public List<PickupSchedule> getAllPickupSchedules() {
        return pickupScheduleRepository.findAll();
    }

    public Optional<PickupSchedule> getPickupScheduleById(Long id) {
        return pickupScheduleRepository.findById(id);
    }

    public List<PickupSchedule> getPickupSchedulesByUserId(Long userId) {
        return appUserRepository.findById(userId)
                .map(pickupScheduleRepository::findByUser)
                .orElse(List.of());
    }

    public List<PickupSchedule> getPickupSchedulesByStatus(PickupSchedule.PickupStatus status) {
        return pickupScheduleRepository.findByStatus(status);
    }

    public List<PickupSchedule> getPickupSchedulesByDateRange(LocalDateTime start, LocalDateTime end) {
        return pickupScheduleRepository.findByPickupDateBetween(start, end);
    }

    public PickupSchedule savePickupSchedule(PickupSchedule pickupSchedule) {
        return pickupScheduleRepository.save(pickupSchedule);
    }

    public Optional<PickupSchedule> updatePickupStatus(Long id, PickupSchedule.PickupStatus status) {
        return pickupScheduleRepository.findById(id)
                .map(schedule -> {
                    schedule.setStatus(status);
                    if (status == PickupSchedule.PickupStatus.COMPLETED) {
                        schedule.setCompletedAt(LocalDateTime.now());
                    }
                    return pickupScheduleRepository.save(schedule);
                });
    }

    public void deletePickupSchedule(Long id) {
        pickupScheduleRepository.deleteById(id);
    }
}