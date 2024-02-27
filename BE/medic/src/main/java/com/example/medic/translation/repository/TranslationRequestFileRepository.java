package com.example.medic.translation.repository;

import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TranslationRequestFileRepository extends JpaRepository<TranslationRequestFile,Long> {


    TranslationRequestFile findByTranslationRequestList(TranslationRequestList translationRequestList);

    @Query("SELECT tr FROM TranslationRequestFile tr WHERE tr.translationRequestList.trId = :trId")
    TranslationRequestFile findByTrId(@Param("trId") Long trId);

    @Query("SELECT trf.tfId FROM TranslationRequestFile trf WHERE trf.translationRequestList.trId = :trId")
    Long findByFileId(Long trId);
}
