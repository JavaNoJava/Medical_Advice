package com.example.medic.advice.dto;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.LoginDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
public class AdviceSituationDto {

    private Long adId;
    private String adPtSub;
    private String adPtDiagnosis;
    private LocalDate adRegDate;
    private LocalDate admDate;
    private LocalDate adAnswerDate;
    private String admProgressStatus;

    public AdviceSituationDto(Long adId, String adPtSub, String adPtDiagnosis, LocalDate adRegDate, LocalDate admDate, LocalDate adAnswerDate, String admProgressStatus) {
        this.adId = adId;
        this.adPtSub = adPtSub;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adRegDate = adRegDate;
        this.admDate = admDate;
        this.adAnswerDate = adAnswerDate;
        this.admProgressStatus = admProgressStatus;
    }
}