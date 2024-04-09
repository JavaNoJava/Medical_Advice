package com.example.medic.medicalKnowledge.repository;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import lombok.Builder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IndustrialAccidentInfoRepository extends JpaRepository<IndustrialAccidentInfo, Long> {

    /**
     * 검색 기능
     */
    List<IndustrialAccidentInfo> findByIaNameContaining(String keyword);

    @Query(value = "SELECT * FROM industrial_accident_info WHERE ia_id < :iaId ORDER BY ia_id DESC LIMIT 1",
            nativeQuery = true)
    IndustrialAccidentInfo findPrevIndustrialAccident(@Param("iaId") Long iaId);

    @Query(value = "SELECT * FROM industrial_accident_info WHERE ia_id > :iaId ORDER BY ia_id ASC LIMIT 1", nativeQuery = true)
    IndustrialAccidentInfo findNextIndustrialAccident(@Param("iaId") Long iaId);

    @Query("SELECT i.manager from IndustrialAccidentInfo i WHERE i.iaId = :iaId")
    Manager findManagerByIaid(Long iaId);
}
