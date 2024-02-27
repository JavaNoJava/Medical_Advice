package com.example.medic.manager.dto;

import com.example.medic.analyze.domain.AnalyzeRequest;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class AnDetailDto {

    private String anPtName;

    private String anPtSsNum;

    private String anPtSub;
    private String anPtDiagnosis;

    private String anPtDiagContent;

    private String anEtc;

    private LocalDate anRegDate;

    private LocalDate anMdDate;

    private String uId;
    private String uName;
    private String userAddress;
    private String userPhone;
    private String userTel;

    private String anReqForm;

    private String anDiagnosis;

    private String anRecord;

    private String anFilm;

    private String anOther;

    private List<AnalyzeRequest> analyzeRequestList;



    @Builder
    public AnDetailDto(String anPtName,String anPtSsNum, String anPtSub, String anPtDiagnosis, String anPtDiagContent

                        ,String anEtc, LocalDate anRegDate, LocalDate anMdDate,  String uId, String uName, String userAddress, String userPhone, String userTel,
                       String anReqForm, String anDiagnosis, String anRecord, String anFilm, String anOther,
                  List<AnalyzeRequest> analyzeRequests ){

        this.anPtName = anPtName;
        this.anPtSsNum = anPtSsNum;
        this.anPtSub = anPtSub;
        this.anPtDiagnosis = anPtDiagnosis;
        this.anPtDiagContent = anPtDiagContent;
        this.anEtc = anEtc;
        this.anRegDate = anRegDate;
        this.anMdDate = anMdDate;

        this.uId = uId;
        this.userAddress = userAddress;
        this.userPhone = userPhone;
        this.userTel = userTel;
        this.uName = uName;

        this.anReqForm = anReqForm;
        this.anDiagnosis = anDiagnosis;
        this.anRecord = anRecord;
        this.anFilm = anFilm;
        this.anOther=anOther;

        this.analyzeRequestList = analyzeRequests;


    }
}
