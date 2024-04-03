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

import javax.persistence.Column;
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
    @Column(length = 12)
    private String cId;

    @NotNull
    @Column(length = 15)
    private String cPw;

    @NotNull
    @Column(length = 10)
    private String cRole;

    @NotNull
    @Column(length = 20)
    private String cName;

    @NotNull
    @Column(length = 30)
    private String cEmail;

    @Column(length = 13)
    private String cTel;

    @NotNull
    @Column(length = 13)
    private String cPhone;

    @NotNull
    @Column(length = 100)
    private String cAddress;

    @NotNull
    @Column(length = 30)
    private String hospName;

    @NotNull
    @Column(length = 13)
    private String hospTel;

    @NotNull
    @Column(length = 13)
    private String department;

    @Column(length = 15)
    private String hospFx;

    @NotNull
    @Column(length = 20)
    private String hospNum;
    @NotNull
    @Column(length = 100)
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
