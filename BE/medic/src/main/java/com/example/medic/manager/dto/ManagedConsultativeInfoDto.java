package com.example.medic.manager.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ManagedConsultativeInfoDto {

    private String cId;

    private String cPw;

    private String cRole;

    private String cName;

    private String cEmail;

    private String cTel;

    private String cPhone;

    private String cAddress;

    private String hospName;

    private String hospTel;

    private String department;

    private String hospFx;

    private String hospNum;

    private String hospAddress;

    int countByAdviceAssignment;

    int countByAnalyzeAssignment;

    int countByTranslateAssignment;

    @Builder
    ManagedConsultativeInfoDto(String cId, String cPw, String cRole, String cName, String cEmail, String cTel,
                               String cPhone, String cAddress, String hospName, String hospTel,
                               String department, String hospFx, String hospNum, String hospAddress,
                               int countByAdviceAssignment, int countByAnalyzeAssignment,
                               int countByTranslateAssignment) {
        this.cId = cId;
        this.cPw = cPw;
        this.cRole = cRole;
        this.cName = cName;
        this.cEmail = cEmail;
        this.cTel = cTel;
        this.cPhone = cPhone;
        this.cAddress = cAddress;
        this.hospName = hospName;
        this.hospTel = hospTel;
        this.department = department;
        this.hospFx = hospFx;
        this.hospNum = hospNum;
        this.hospAddress = hospAddress;
        this.countByAdviceAssignment = countByAdviceAssignment;
        this.countByAnalyzeAssignment = countByAnalyzeAssignment;
        this.countByTranslateAssignment = countByTranslateAssignment;
    }
}
