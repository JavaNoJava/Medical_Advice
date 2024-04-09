package com.example.medic.medicalKnowledge.repository;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrafficAccidentInfoJpaRepository extends JpaRepository<TrafficAccidentInfo, Long> {

    /**
     * 검색 기능
     */
    List<TrafficAccidentInfo> findByTaNameContaining(String keyword);

    @Query(value = "SELECT * FROM traffic_accident_info WHERE ta_id < :taId ORDER BY ta_id DESC LIMIT 1",
            nativeQuery = true)
    TrafficAccidentInfo findPrevTrafficAccident(@Param("taId") Long iaId);

    @Query(value = "SELECT * FROM traffic_accident_info WHERE ta_id > :taId ORDER BY ta_id ASC LIMIT 1",
            nativeQuery = true)
    TrafficAccidentInfo findNextTrafficAccident(@Param("taId") Long iaId);

    @Query("SELECT t.manager from TrafficAccidentInfo t WHERE t.taId = :taId")
    Manager findManagerByTaid(Long taId);
}
