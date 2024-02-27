package com.example.medic.manager.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
public class TrDetailDto {
    private String trPtName;

    private String trPtSsNum;

    private String trPtSub;

    private String trPtDiagnosis;

    private String trPtDiagContent;

    private String trEtc;

    private LocalDate trRegDate;

    private LocalDate trMdDate;

    private String uId;
    private String uName;
    private String userAddress;
    private String userPhone;
    private String userTel;

    private String trMtl;
    private String trAnswer;

@Builder
    public TrDetailDto(String trPtName , String trPtSsNum, String trPtSub, String trEtc, LocalDate trMdDate,String trPtDiagnosis,
                      String uId, String uName, String userAddress, String userPhone, String userTel ,String trPtDiagContent,
                      String trMtl, String trAnswer){
    this.trPtName = trPtName;
    this.trEtc = trEtc;
    this.trMdDate = trMdDate;
    this.trPtDiagContent= trPtDiagContent;
    this.trPtDiagnosis = trPtDiagnosis;
    this.trPtSsNum = trPtSsNum;
    this.trPtSub = trPtSub;
    this.uId = uId;
    this.uName = uName;
    this.userAddress = userAddress;
    this.userPhone = userPhone;
    this.userTel = userTel;

    this.trMtl = trMtl;
    this.trAnswer = trAnswer;
    }
}
