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

    @Query(value = "SELECT * FROM (SELECT ta_id, " +
            "LAG(ta_id, 1, 0) OVER (ORDER BY ta_id) AS prevNum, " +
            "LAG(ta_name, 1, '이전 글이 없습니다.') OVER (ORDER BY ta_id) AS prevTitle, " +
            "LAG(ta_institution, 1, '-') OVER (ORDER BY ta_id) AS PrevWriter, " +
            "LAG(ta_regdate, 1, '-') OVER (ORDER BY ta_id) AS PrevDate " +
            "FROM traffic_accident_info) presub WHERE presub.ta_id = :taId ORDER BY ta_id",
            nativeQuery = true)
    PrevTrafficAccidentInfoDto findPrevTrafficAccident(@Param("taId") Long iaId);

    @Query(value = "SELECT * FROM (SELECT ta_id, " +
            "LEAD(ta_id, 1, 0) OVER (ORDER BY ta_id) AS nextNum, " +
            "LEAD(ta_name, 1, '다음 글이 없습니다.') OVER (ORDER BY ta_id) AS nextTitle, " +
            "LEAD(ta_institution, 1, '-') OVER (ORDER BY ta_id) AS nextWriter, " +
            "LEAD(ta_regdate, 1, '-') OVER (ORDER BY ta_id) AS nextDate " +
            "FROM traffic_accident_info) nextsub WHERE nextsub.ta_id = :taId ORDER BY ta_id",
            nativeQuery = true)
    NextTrafficAccidentInfoDto findNextTrafficAccident(@Param("taId") Long iaId);

    interface PrevTrafficAccidentInfoDto {
        String getPrevNum();
        String getPrevTitle();
        String getPrevWriter();
        String getPrevDate();
    }
    interface NextTrafficAccidentInfoDto {
        String getNextNum();
        String getNextTitle();
        String getNextWriter();
        String getNextDate();
    }
    @Query("SELECT t.manager from TrafficAccidentInfo t WHERE t.taId = :taId")
    Manager findManagerByTaid(Long taId);
}
