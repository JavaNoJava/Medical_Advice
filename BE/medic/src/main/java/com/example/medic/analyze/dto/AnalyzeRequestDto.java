package com.example.medic.analyze.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class AnalyzeRequestDto {
    private Long anId;

    private String anPtName;

    private String anPtSsNum;

    private String anPtSub;

    private String anPtDiagnosis;

    private String anPtDiagContent;

    private String anEtc;

    private Date anRegDate;

    private Date anMdDate;

    private List<String> anQuestionContent;

    private String anReqForm;

    private String anDiagnosis;

    private String anRecord;

    private String anFilm;

    private String anOther;

    @Builder
    private AnalyzeRequestDto(Long anId, String anPtName, String anPtSsNum, String anPtSub,
                              String anPtDiagnosis, String anPtDiagContent, String anEtc,
                              Date anRegDate, Date anMdDate, List<String> anQuestionContent,
                              String anReqForm, String anDiagnosis, String anRecord,
                              String anFilm, String anOther) {
        this.anId = anId;
        this.anPtName = anPtName;
        this.anPtSsNum = anPtSsNum;
        this.anPtSub = anPtSub;
        this.anPtDiagnosis = anPtDiagnosis;
        this.anPtDiagContent = anPtDiagContent;
        this.anEtc = anEtc;
        this.anRegDate = anRegDate;
        this.anMdDate = anMdDate;
        this.anQuestionContent = anQuestionContent;
        this.anReqForm = anReqForm;
        this.anDiagnosis = anDiagnosis;
        this.anRecord = anRecord;
        this.anFilm = anFilm;
        this.anOther = anOther;
    }
}
