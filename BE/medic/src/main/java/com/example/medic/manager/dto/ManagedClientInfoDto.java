package com.example.medic.manager.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ManagedClientInfoDto {

    private String uId;

    private String uPw;

    private String uRole;

    private String uName;

    private String uEmail;

    private String userTel;

    private String userPhone;

    private String userAddress;

    private String company;

    private String ceo;

    private String cpTel;

    private String cpFx;

    private String cpNum;

    private String cpAddress;

    private int countByAdvice;

    private int countByAnalyze;

    private int countByTranslate;

    @Builder
    ManagedClientInfoDto(String uId, String uPw, String uRole, String uName, String uEmail, String userTel,
                         String userPhone, String userAddress, String company, String ceo, String cpTel,
                         String cpFx, String cpNum, String cpAddress, int countByAdvice, int countByAnalyze,
                         int countByTranslate) {
        this.uId = uId;
        this.uPw = uPw;
        this.uRole = uRole;
        this.uName = uName;
        this.uEmail = uEmail;
        this.userTel = userTel;
        this.userPhone = userPhone;
        this.userAddress = userAddress;
        this.company = company;
        this.ceo = ceo;
        this.cpTel = cpTel;
        this.cpFx = cpFx;
        this.cpNum = cpNum;
        this.cpAddress = cpAddress;
        this.countByAdvice = countByAdvice;
        this.countByAnalyze = countByAnalyze;
        this.countByTranslate = countByTranslate;
    }
}
