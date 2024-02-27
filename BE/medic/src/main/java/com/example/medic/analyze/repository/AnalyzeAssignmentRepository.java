package com.example.medic.analyze.repository;


import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.consultative.domain.Consultative;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnalyzeAssignmentRepository extends JpaRepository<AnalyzeAssignment,Long> {

    int countAllByConsultative(Consultative consultative);

    List<AnalyzeAssignment> findAllAnalyzeAssignmentByConsultative(Consultative consultative);

    @Query("SELECT an FROM AnalyzeAssignment an WHERE an.analyzeRequestList.anId = :anId")
    AnalyzeAssignment findByAnId(@Param("anId") Long anId);

    @Query("SELECT aa FROM AnalyzeAssignment aa WHERE aa.consultative.cId = :cId")
    List<AnalyzeAssignment> findByConsultative_CId(String cId);

    AnalyzeAssignment findByAnalyzeRequestList(AnalyzeRequestList analyzeRequestList);
}
