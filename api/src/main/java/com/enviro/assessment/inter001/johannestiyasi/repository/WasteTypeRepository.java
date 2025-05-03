package com.enviro.assessment.inter001.johannestiyasi.repository;

import com.enviro.assessment.inter001.johannestiyasi.model.WasteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WasteTypeRepository extends JpaRepository<WasteType, Long> {
    List<WasteType> findByRecyclable(boolean recyclable);
}