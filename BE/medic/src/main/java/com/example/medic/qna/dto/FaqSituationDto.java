package com.example.medic.qna.dto;

import com.example.medic.manager.domain.Manager;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
public class FaqSituationDto {

    private Long faqId;


    private String faqQuestion;

    private String faqAnswer;

    private LocalDate faqMdDate;

    private LocalDate faqRegDate;
    private String mId;

    @Builder
    public FaqSituationDto(Long faqId,  String faqQuestion, String faqAnswer, LocalDate faqMdDate, LocalDate faqRegDate,String mId){
        this.faqId = faqId;
        this.faqQuestion = faqQuestion;
        this.faqAnswer = faqAnswer;
        this.faqMdDate = faqMdDate;
        this.faqRegDate = faqRegDate;
        this.mId = mId;
    }
}
