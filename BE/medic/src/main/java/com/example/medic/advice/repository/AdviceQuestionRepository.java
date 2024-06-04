package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AdviceQuestionRepository extends JpaRepository<AdviceQuestion, Long> {

    List<AdviceQuestion> findAllByAdviceRequestList(AdviceRequestList adviceRequestList);


    @Query("SELECT aa FROM AdviceQuestion aa WHERE aa.adviceRequestList.adId = :adId")
    AdviceQuestion findByAdId(@Param("adId") Long adId);

    @Query("SELECT aa FROM AdviceQuestion aa WHERE aa.adviceRequestList.adId = :adId")
    List<AdviceQuestion> findByAdIds(@Param("adId") Long adId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM AdviceQuestion a WHERE a.adAnswerDate IS NULL AND a.adviceRequestList = :adviceRequestList")
    boolean existsByAdAnswerDateNullAndAdviceRequestList(@Param("adviceRequestList") AdviceRequestList adviceRequestList);

    @Query("SELECT MAX(a.adAnswerDate) FROM AdviceQuestion a WHERE a.adviceRequestList = :adviceRequestList ORDER BY a.adAnswerDate DESC")
    LocalDate findLatestAdAnswerDateByAdviceRequestList(@Param("adviceRequestList") AdviceRequestList adviceRequestList);
}
