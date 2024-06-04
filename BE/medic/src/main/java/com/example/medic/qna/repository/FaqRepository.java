package com.example.medic.qna.repository;

import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository;
import com.example.medic.qna.domain.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FaqRepository extends JpaRepository<Faq,Long> {

    @Query(value = "SELECT * FROM faq WHERE faq_id < :faqId ORDER BY faq_id DESC LIMIT 1",
            nativeQuery = true)
    Faq findPrevFaqInfo(@Param("faqId") Long faqId);

    @Query(value = "SELECT * FROM faq WHERE faq_id > :faqId ORDER BY faq_id ASC LIMIT 1", nativeQuery = true)
    Faq findNextFaqInfo(@Param("faqId") Long faqId);

    List<Faq> findByFaqQuestionContaining(String keyword);

}
