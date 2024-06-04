package com.example.medic.translation.dto;

import com.example.medic.translation.domain.TranslationRequestList;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class TranslationSituationDto {

    private Long trId;
    private String trPtSub;
    private String trPtDiagnosis;
    private LocalDate trRegDate;
    private LocalDate tamDate;
    private LocalDate trAnswerDate;
    private String trProgressStatus;

    public TranslationSituationDto(Long trId, String trPtSub, String trPtDiagnosis, LocalDate trRegDate, LocalDate tamDate,
                                   LocalDate trAnswerDate, String trProgressStatus) {
        this.trId = trId;
        this.trPtSub = trPtSub;
        this.trPtDiagnosis = trPtDiagnosis;
        this.trRegDate = trRegDate;
        this.tamDate = tamDate;
        this.trAnswerDate = trAnswerDate;
        this.trProgressStatus = trProgressStatus;
    }
}
