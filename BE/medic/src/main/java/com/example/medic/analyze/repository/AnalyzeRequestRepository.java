package com.example.medic.analyze.repository;

import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AnalyzeRequestRepository extends JpaRepository<AnalyzeRequest,Long> {


    List<AnalyzeRequest> findAllByAnalyzeRequestList(AnalyzeRequestList analyzeRequestList);

    @Query("SELECT an FROM AnalyzeRequest an WHERE an.analyzeRequestList.anId = :anId")
    AnalyzeRequest findByAnId(@Param("anId") Long anId);

    @Query("SELECT an FROM AnalyzeRequest an WHERE an.analyzeRequestList.anId = :anId")
    List<AnalyzeRequest> findByAnIds(@Param("anId") Long anId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM AnalyzeRequest a WHERE a.anAnswerDate IS NULL AND a.analyzeRequestList = :analyzeRequestList")
    boolean existsByAnAnswerDateNullAndAnalyzeRequestList(@Param("analyzeRequestList") AnalyzeRequestList analyzeRequestList);

    @Query("SELECT MAX(a.anAnswerDate) FROM AnalyzeRequest a WHERE a.analyzeRequestList = :analyzeRequestList ORDER BY a.anAnswerDate DESC")
    LocalDate findLatestAnAnswerDateByAnalyzeRequestList(@Param("analyzeRequestList") AnalyzeRequestList analyzeRequestList);

}
