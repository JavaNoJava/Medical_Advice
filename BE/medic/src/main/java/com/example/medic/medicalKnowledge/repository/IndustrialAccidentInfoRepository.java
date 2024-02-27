package com.example.medic.medicalKnowledge.repository;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IndustrialAccidentInfoRepository extends JpaRepository<IndustrialAccidentInfo, Long> {

    /**
     * 검색 기능
     */
    List<IndustrialAccidentInfo> findByIaNameContaining(String keyword);

    @Query(value = "SELECT * FROM (SELECT ia_id, " +
            "LAG(ia_id, 1, 0) OVER (ORDER BY ia_id) AS prevNum, " +
            "LAG(ia_name, 1, '이전 글이 없습니다.') OVER (ORDER BY ia_id) AS prevTitle, " +
            "LAG(ia_institution, 1, '-') OVER (ORDER BY ia_id) AS PrevWriter, " +
            "LAG(ia_reg_date, 1, '-') OVER (ORDER BY ia_id) AS PrevDate " +
            "FROM industrial_accident_info) presub WHERE presub.ia_id = :iaId ORDER BY ia_id",
            nativeQuery = true)
    PrevIndustrialAccidentInfoDto findPrevIndustrialAccident(@Param("iaId") Long iaId);

    @Query(value = "SELECT * FROM (SELECT ia_id, " +
            "LEAD(ia_id, 1, 0) OVER (ORDER BY ia_id) AS nextNum, " +
            "LEAD(ia_name, 1, '다음 글이 없습니다.') OVER (ORDER BY ia_id) AS nextTitle, " +
            "LEAD(ia_institution, 1, '-') OVER (ORDER BY ia_id) AS nextWriter, " +
            "LEAD(ia_reg_date, 1, '-') OVER (ORDER BY ia_id) AS nextDate " +
            "FROM industrial_accident_info) nextsub WHERE nextsub.ia_id = :iaId ORDER BY ia_id",
            nativeQuery = true)
    NextIndustrialAccidentInfoDto findNextIndustrialAccident(@Param("iaId") Long iaId);

    interface PrevIndustrialAccidentInfoDto {
        String getPrevNum();
        String getPrevTitle();
        String getPrevWriter();
        String getPrevDate();
    }
    interface NextIndustrialAccidentInfoDto {
        String getNextNum();
        String getNextTitle();
        String getNextWriter();
        String getNextDate();
    }
    @Query("SELECT i.manager from IndustrialAccidentInfo i WHERE i.iaId = :iaId")
    Manager findManagerByIaid(Long iaId);
}
