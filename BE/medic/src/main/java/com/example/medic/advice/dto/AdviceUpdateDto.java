package com.example.medic.advice.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class AdviceUpdateDto {

    private Long adId;

    private String adPtName;

    private String adPtSsNum;

    private String adPtSub;

    private String adPtDiagnosis;

    private String adPtRec;

    private String adPtCmt;

    private String insurance;

    private String insureDate;

    private String insureName;

    private String adEtc;

    private String hospital;

    private String admStart;

    private String admEnd;

    private String visitStart;

    private String visitEnd;

    private String treatCmt;

    private int diagRound;

    private LocalDate adMdDate;

    private List<String> adQuestionContent;

    /*자문 파일*/
    private String adReqForm;

    private String adDiagnosis;

    private String adRecord;

    private String adFilm;

    private String adOther;
}
