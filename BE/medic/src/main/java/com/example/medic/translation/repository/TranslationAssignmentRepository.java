package com.example.medic.translation.repository;


import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.consultative.domain.Consultative;

import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.domain.TranslationRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TranslationAssignmentRepository extends JpaRepository<TranslationAssignment,Long> {


    int countAllByConsultative(Consultative consultative);

    List<TranslationAssignment> findAllTranslationAssignmentByConsultative(Consultative findConsultative);

    @Query("SELECT tr FROM TranslationAssignment tr WHERE tr.translationRequestList.trId = :trId")
    TranslationAssignment findByTrId(@Param("trId") Long trId);

    @Query("SELECT ta FROM TranslationAssignment ta WHERE ta.consultative.cId = :cId")
    List<TranslationAssignment> findByConsultative_CId(String cId);
}
