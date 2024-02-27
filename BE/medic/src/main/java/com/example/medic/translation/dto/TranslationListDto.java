package com.example.medic.translation.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class TranslationListDto {
    private Long trId;

    private String trPtName;

    private String trPtSsNum;

    private String trPtSub;

    private String trPtDiagnosis;

    private String trPtDiagContent;

    private String trEtc;

    private LocalDate trRegDate;

    private LocalDate trMdDate;
}
