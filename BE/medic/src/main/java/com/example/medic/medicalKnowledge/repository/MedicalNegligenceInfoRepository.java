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

    @Query(value = "SELECT * FROM (SELECT mn_id, " +
            "LAG(mn_id, 1, 0) OVER (ORDER BY mn_id) AS prevNum, " +
            "LAG(mn_name, 1, '이전 글이 없습니다.') OVER (ORDER BY mn_id) AS prevTitle, " +
            "LAG(mn_institution, 1, '-') OVER (ORDER BY mn_id) AS PrevWriter, " +
            "LAG(mn_regdate, 1, '-') OVER (ORDER BY mn_id) AS PrevDate " +
            "FROM medical_negligence_info) presub WHERE presub.mn_id = :mnId ORDER BY mn_id",
            nativeQuery = true)
    PrevMedicalNegligenceInfoDto findPrevMedicalNegligence(@Param("mnId") Long mnId);

    @Query(value = "SELECT * FROM (SELECT mn_id, " +
            "LEAD(mn_id, 1, 0) OVER (ORDER BY mn_id) AS nextNum, " +
            "LEAD(mn_name, 1, '다음 글이 없습니다.') OVER (ORDER BY mn_id) AS nextTitle, " +
            "LEAD(mn_institution, 1, '-') OVER (ORDER BY mn_id) AS nextWriter, " +
            "LEAD(mn_regdate, 1, '-') OVER (ORDER BY mn_id) AS nextDate " +
            "FROM medical_negligence_info) nextsub WHERE nextsub.mn_id = :mnId ORDER BY mn_id",
            nativeQuery = true)
    NextMedicalNegligenceInfoDto findNextMedicalNegligence(@Param("mnId") Long mnId);

    interface PrevMedicalNegligenceInfoDto {
        String getPrevNum();
        String getPrevTitle();
        String getPrevWriter();
        String getPrevDate();
    }
    interface NextMedicalNegligenceInfoDto {
        String getNextNum();
        String getNextTitle();
        String getNextWriter();
        String getNextDate();
    }

    @Query("SELECT m.manager from MedicalNegligenceInfo m WHERE m.mnId = :mnId")
    Manager findManagerByMnid(Long mnId);
}
