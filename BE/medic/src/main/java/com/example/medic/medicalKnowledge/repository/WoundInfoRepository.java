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

//    @Query(value = "SELECT wo_name as woName, wo_institution as woInstitution, wo_regdate as woRegdate, " +
//            "(SELECT MAX(wo_id) FROM wound_info WHERE wo_id < :woId) AS prevNum, " +
//            "COALESCE((SELECT wo_name FROM wound_info WHERE wo_id < :woId ORDER BY wo_id DESC LIMIT 1), '이전글이 없습니다') AS prevTitle, " +
//            "COALESCE((SELECT wo_institution FROM wound_info WHERE wo_id < :woId ORDER BY wo_id DESC LIMIT 1), '-') AS prevWriter, " +
//            "COALESCE((SELECT wo_regdate FROM wound_info WHERE wo_id < :woId ORDER BY wo_id DESC LIMIT 1), '-') AS prevDate " +
//            "FROM wound_info " +
//            "WHERE wo_id = :woId",
//            nativeQuery = true)

    //LAG(wo_id, 1, 0)
    //wo_id: column (값 반환할 컬럼 이름)
    //1: offset (얼마나 멀리 떨어진 이전 행의 값)
    //0: default (이전 행이 존재하지 않으면 반환할 기본값, 첫번째 인자로 지정된 컬럼의 데이터 타입과 일치 해야함)
    @Query(value = "SELECT * FROM (SELECT wo_id, " +
            "LAG(wo_id, 1, 0) OVER (ORDER BY wo_id) AS prevNum, " +
            "LAG(wo_name, 1, '이전 글이 없습니다.') OVER (ORDER BY wo_id) AS prevTitle, " +
            "LAG(wo_institution, 1, '-') OVER (ORDER BY wo_id) AS PrevWriter, " +
            "LAG(wo_regdate, 1, '-') OVER (ORDER BY wo_id) AS PrevDate " +
            "FROM wound_info) presub WHERE presub.wo_id = :woId ORDER BY wo_id",
            nativeQuery = true)
    PrevWoundInfoDto findPrevWound(@Param("woId") Long woId);

    //LEAD(wo_id, 1, 0)
    //wo_id: column (값 반환할 컬럼 이름)
    //1: offset (얼마나 멀리 떨어진 이전 행의 값)
    //0: default (다음 행이 존재하지 않으면 반환할 기본값, 첫번째 인자로 지정된 컬럼의 데이터 타입과 일치 해야함)
    @Query(value = "SELECT * FROM (SELECT wo_id, " +
            "LEAD(wo_id, 1, 0) OVER (ORDER BY wo_id) AS nextNum, " +
            "LEAD(wo_name, 1, '다음 글이 없습니다.') OVER (ORDER BY wo_id) AS nextTitle, " +
            "LEAD(wo_institution, 1, '-') OVER (ORDER BY wo_id) AS nextWriter, " +
            "LEAD(wo_regdate, 1, '-') OVER (ORDER BY wo_id) AS nextDate " +
            "FROM wound_info) nextsub WHERE nextsub.wo_id = :woId ORDER BY wo_id",
            nativeQuery = true)
    NextWoundInfoDto findNextWound(@Param("woId") Long woId);

    interface PrevWoundInfoDto {
        String getPrevNum();
        String getPrevTitle();
        String getPrevWriter();
        String getPrevDate();
    }
    interface NextWoundInfoDto {
        String getNextNum();
        String getNextTitle();
        String getNextWriter();
        String getNextDate();
    }
    @Query("SELECT w.manager from WoundInfo w WHERE w.woId = :woId")
    Manager findManagerByWoid(Long woId);

}
