package com.enviro.assessment.inter001.johannestiyasi.repository;

import com.enviro.assessment.inter001.johannestiyasi.model.AppUser;
import com.enviro.assessment.inter001.johannestiyasi.model.WasteRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WasteRecordRepository extends JpaRepository<WasteRecord, Long> {
    List<WasteRecord> findByUser(AppUser user);
    
    List<WasteRecord> findByUserAndDisposedAtBetween(AppUser user, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(w.weightKg) FROM WasteRecord w WHERE w.disposalMethod = 'RECYCLED'")
    Double getTotalRecycledWaste();
}