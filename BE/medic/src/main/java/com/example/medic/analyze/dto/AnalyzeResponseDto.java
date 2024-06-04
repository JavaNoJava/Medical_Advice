package com.example.medic.analyze.dto;

import com.example.medic.analyze.domain.AnalyzeRequest;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Builder
public class AnalyzeResponseDto {
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

    private List<String> anAnswerContent;

    private LocalDate anAnswerDate;

    private String anReqForm;

    private String anDiagnosis;

    private String anRecord;

    private String anFilm;

    private String anOther;

    private String uName;

    private String userTel;

    private String userPhone;

    private String userAddress;

    private List<AnalyzeRequest> analyzeRequests;

    private LocalDate adMdDate;

    private String anProgressStatus;

    private AnalyzeResponseDto(Long anId, String anPtName, String anPtSsNum, String anPtSub, String anPtDiagnosis,
                               String anPtDiagContent, String anEtc, Date anRegDate, Date anMdDate,
                               List<String> anQuestionContent, List<String> anAnswerContent, LocalDate anAnswerDate,
                               String anReqForm, String anDiagnosis, String anRecord, String anFilm, String anOther, String uName,
                               String userTel, String userPhone, String userAddress, List<AnalyzeRequest> analyzeRequests,
                               LocalDate adMdDate, String anProgressStatus) {
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
        this.anAnswerContent = anAnswerContent;
        this.anAnswerDate = anAnswerDate;
        this.anReqForm = anReqForm;
        this.anDiagnosis = anDiagnosis;
        this.anRecord = anRecord;
        this.anFilm = anFilm;
        this.anOther = anOther;
        this.uName = uName;
        this.userTel = userTel;
        this.userPhone = userPhone;
        this.userAddress = userAddress;
        this.analyzeRequests = analyzeRequests;
        this.adMdDate = adMdDate;
        this.anProgressStatus = anProgressStatus;
    }
}
