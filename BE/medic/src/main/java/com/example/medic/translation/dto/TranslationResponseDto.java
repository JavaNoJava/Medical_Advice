package com.example.medic.translation.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class TranslationResponseDto {

    private Long trId;

    private String trPtName;

    private String trPtSsNum;

    private String trPtSub;

    private String trPtDiagnosis;

    private String trPtDiagContent;

    private String trEtc;

    private LocalDate trRegDate;

    private LocalDate trMdDate;

    private String trMtl;       // 번역 의뢰 내역 파일

    private String trAnswer;    // 번역 의뢰 답변 파일

    private String uName;

    private String userTel;

    private String userPhone;

    private String userAddress;

    private LocalDate tamDate;

    private String trProgressStatus;
}
