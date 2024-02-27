package com.example.medic.analyze.dto;

import com.example.medic.client.domain.Client;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
public class AnalyzeRequestListDto {

    private Long anId;

    private String anPtName;

    private String anPtSsNum;

    private String anPtSub;

    private String anPtDiagnosis;

    private String anPtDiagContent;

    private String anEtc;

    private LocalDate anRegDate;

    private LocalDate anMdDate;

}

