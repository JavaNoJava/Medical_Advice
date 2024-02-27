package com.example.medic.consultative.domain;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.manager.dto.ManagedConsultativeInfoDto;
import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationAssignment;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Consultative {

    @Id
    @NotNull
    private String cId;

    @NotNull
    private String cPw;

    @NotNull
    private String cRole;

    @NotNull
    private String cName;

    @NotNull
    private String cEmail;

    private String cTel;

    @NotNull
    private String cPhone;

    @NotNull
    private String cAddress;

    @NotNull
    private String hospName;

    @NotNull
    private String hospTel;

    @NotNull
    private String department;

    private String hospFx;

    @NotNull
    private String hospNum;
    @NotNull
    private String hospAddress;

    @OneToMany(mappedBy = "consultative")
    private List<AdviceAssignment> adviceAssignments = new ArrayList<>();

    @OneToMany(mappedBy = "consultative")
    private List<AnalyzeAssignment> analyzeAssignments = new ArrayList<>();

    @OneToMany(mappedBy = "consultative")
    private List<TranslationAssignment> translationAssignments = new ArrayList<>();

    @OneToMany(mappedBy = "consultative")
    private List<TranslationAnswerFile> translationAnswerFiles = new ArrayList<>();

    @Builder
    Consultative(String cId, String cPw, String cRole, String cName, String cEmail, String cTel,
                               String cPhone, String cAddress, String hospName, String hospTel,
                               String department, String hospFx, String hospNum, String hospAddress) {
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
    }

    public void updateConsultativeByManager(ManagedConsultativeInfoDto managedConsultativeInfoDto) {
        this.cId = managedConsultativeInfoDto.getCId();
        this.cPw = managedConsultativeInfoDto.getCPw();
        this.cRole = managedConsultativeInfoDto.getCRole();
        this.cName = managedConsultativeInfoDto.getCName();
        this.cEmail = managedConsultativeInfoDto.getCEmail();
        this.cTel = managedConsultativeInfoDto.getCTel();
        this.cPhone = managedConsultativeInfoDto.getCPhone();
        this.cAddress = managedConsultativeInfoDto.getCAddress();
        this.hospName = managedConsultativeInfoDto.getHospName();
        this.hospTel = managedConsultativeInfoDto.getHospTel();
        this.department = managedConsultativeInfoDto.getDepartment();
        this.hospFx = managedConsultativeInfoDto.getHospFx();
        this.hospNum = managedConsultativeInfoDto.getHospNum();
        this.hospAddress = managedConsultativeInfoDto.getHospAddress();
    }

    public void updatePassword(String newCPw) {
        this.cPw = newCPw;
    }
}
