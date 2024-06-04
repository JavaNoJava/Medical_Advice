package com.example.medic.medicalKnowledge.repository;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.WoundInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WoundInfoRepository extends JpaRepository<WoundInfo,Long> {

    /**
     * 검색 기능
     */
    List<WoundInfo> findByWoNameContaining(String keyword);

    @Query(value = "SELECT * FROM wound_info WHERE wo_id < :woId ORDER BY wo_id DESC LIMIT 1",
            nativeQuery = true)
    WoundInfo findPrevWound(@Param("woId") Long woId);

    @Query(value = "SELECT * FROM wound_info WHERE wo_id > :woId ORDER BY wo_id ASC LIMIT 1",
            nativeQuery = true)
    WoundInfo findNextWound(@Param("woId") Long woId);

    @Query("SELECT w.manager from WoundInfo w WHERE w.woId = :woId")
    Manager findManagerByWoid(Long woId);

}
