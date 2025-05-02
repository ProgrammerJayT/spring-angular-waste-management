package com.enviro.assessment.inter001.johannestiyasi.repository;

import com.enviro.assessment.inter001.johannestiyasi.model.RecyclingBin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecyclingBinRepository extends JpaRepository<RecyclingBin, Long> {
    @Query("SELECT r FROM RecyclingBin r WHERE r.wasteTypes LIKE %:wasteType%")
    List<RecyclingBin> findByWasteType(String wasteType);
}