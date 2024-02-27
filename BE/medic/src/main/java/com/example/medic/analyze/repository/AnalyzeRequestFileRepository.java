package com.example.medic.analyze.repository;

import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnalyzeRequestFileRepository extends JpaRepository<AnalyzeRequestFile, Long> {

    AnalyzeRequestFile findByAnalyzeRequestList(AnalyzeRequestList analyzeRequestList);

    @Query("SELECT anf.anfId FROM AnalyzeRequestFile anf WHERE anf.analyzeRequestList.anId = :anId")
    Long findByFileId(Long anId);
}
