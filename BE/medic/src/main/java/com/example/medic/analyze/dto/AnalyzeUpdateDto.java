package com.example.medic.analyze.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
public class AnalyzeUpdateDto {

    private Long anId;

    private String anPtName;

    private String anPtSsNum;

    private String anPtSub;

    private String anPtDiagnosis;

    private String anPtDiagContent;

    private String anEtc;

    private Date anMdDate;

    private List<String> anQuestionContent;

    private String anReqForm;

    private String anDiagnosis;

    private String anRecord;

    private String anFilm;

    private String anOther;
}
