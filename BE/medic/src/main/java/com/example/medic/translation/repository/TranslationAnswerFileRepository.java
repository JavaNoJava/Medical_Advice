package com.example.medic.translation.repository;

import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationRequestList;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface TranslationAnswerFileRepository extends JpaRepository<TranslationAnswerFile,Long> {

    TranslationAnswerFile findByTranslationRequestList(TranslationRequestList translationRequestList);

    @Query("SELECT traf.trAnswerId FROM TranslationAnswerFile traf WHERE traf.translationRequestList.trId = :trId")
    Long findByFileId(Long trId);

    @Query("SELECT traf FROM TranslationAnswerFile traf WHERE traf.translationRequestList.trId = :trId")
    TranslationAnswerFile findAnswerFileById(Long trId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM TranslationAnswerFile a WHERE a.trAnswerDate IS NULL AND a.translationRequestList = :translationRequestList")
    boolean existsByTrAnswerDateNullAndTranslationRequestList(@Param("translationRequestList") TranslationRequestList translationRequestList);

    @Query("SELECT a.trAnswerDate FROM TranslationAnswerFile a WHERE a.translationRequestList = :translationRequestList ORDER BY a.trAnswerDate")
    LocalDate findLatestTrAnswerDateByTranslationRequestList(@Param("translationRequestList") TranslationRequestList translationRequestList);
}
