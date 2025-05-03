package com.enviro.assessment.inter001.johannestiyasi.repository;

import com.enviro.assessment.inter001.johannestiyasi.model.AppUser;
import com.enviro.assessment.inter001.johannestiyasi.model.PickupSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PickupScheduleRepository extends JpaRepository<PickupSchedule, Long> {
    List<PickupSchedule> findByUser(AppUser user);
    
    List<PickupSchedule> findByStatus(PickupSchedule.PickupStatus status);
    
    List<PickupSchedule> findByPickupDateBetween(LocalDateTime start, LocalDateTime end);
    
    List<PickupSchedule> findByUserAndStatus(AppUser user, PickupSchedule.PickupStatus status);
}