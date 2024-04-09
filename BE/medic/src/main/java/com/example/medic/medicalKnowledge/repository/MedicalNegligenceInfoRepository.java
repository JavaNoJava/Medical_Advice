package com.example.medic.medicalKnowledge.repository;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicalNegligenceInfoRepository extends JpaRepository<MedicalNegligenceInfo,Long> {

    /**
     * 검색 기능
     */
    List<MedicalNegligenceInfo> findByMnNameContaining(String keyword);

    @Query(value = "SELECT * FROM medical_negligence_info WHERE mn_id < :mnId ORDER BY mn_id DESC LIMIT 1",
            nativeQuery = true)
    MedicalNegligenceInfo findPrevMedicalNegligence(@Param("mnId") Long mnId);

    @Query(value = "SELECT * FROM medical_negligence_info WHERE mn_id > :mnId ORDER BY mn_id ASC LIMIT 1", nativeQuery = true)
    MedicalNegligenceInfo findNextMedicalNegligence(@Param("mnId") Long mnId);

    @Query("SELECT m.manager from MedicalNegligenceInfo m WHERE m.mnId = :mnId")
    Manager findManagerByMnid(Long mnId);
}
