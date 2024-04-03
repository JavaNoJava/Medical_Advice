package com.example.medic.advice.domain;

import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.client.domain.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class AdviceRequestList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long adId;

    @NotNull
    @Column(length = 20)
    private String adPtName;

    @NotNull
    @Column(length = 14)
    private String adPtSsNum;

    @NotNull
    @Column(length = 10)
    private String adPtSub;

    @NotNull
    @Column(length = 50)
    private String adPtDiagnosis;

    @Column(length = 100)
    private String adPtRec;

    @NotNull
    @Column(length = 500)
    private String adPtCmt;

    @Column(length = 10)
    private String insurance;

    @Column(length = 10)
    private String insureDate;

    @Column(length = 20)
    private String insureName;

    @Column(length = 300)
    private String adEtc;

    private LocalDate adRegDate;

    private LocalDate adMdDate;

    @ManyToOne
    @JoinColumn(name = "client_Id")
    @JsonIgnore
    private Client client;

    @OneToMany(mappedBy = "adviceRequestList" , cascade = CascadeType.ALL)
    private List<DiagnosisRecord> diagnosisRecords = new ArrayList<>();

    @OneToMany(mappedBy = "adviceRequestList", cascade = CascadeType.ALL)
    private List<AdviceFile> AdviceFiles = new ArrayList<>();

    @OneToMany(mappedBy = "adviceRequestList" , cascade = CascadeType.ALL)
    private List<AdviceQuestion> AdviceQuestions = new ArrayList<>();


    @OneToOne(mappedBy = "adviceRequestList", cascade = CascadeType.ALL)
    @JsonIgnore
    private AdviceAssignment adviceAssignment;

    @Builder(toBuilder = true)
    private AdviceRequestList(Long adId, String adPtName, String adPtSsNum, String adPtSub, String adPtDiagnosis,
                              String adPtRec, String adPtCmt, String insurance, String insureDate, String insureName,
                              String adEtc, LocalDate adMdDate, LocalDate adRegDate, Client client){
        this.adId = adId;
        this.adPtName = adPtName;
        this.adPtCmt = adPtCmt;
        this.adPtSsNum = adPtSsNum;
        this.adPtSub = adPtSub;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adPtRec = adPtRec;
        this.adEtc = adEtc;
        this.insurance =insurance;
        this.insureDate = insureDate;
        this.insureName = insureName;
        this.adMdDate = adMdDate;
        this.adRegDate = adRegDate;
        this.client = client;
    }

    @Builder
    private AdviceRequestList(Long adId, String adPtName, String adPtSsNum, String adPtSub, String adPtDiagnosis,
                              String adPtRec, String adPtCmt, String insurance, String insureDate, String insureName,
                              String adEtc, LocalDate adMdDate, LocalDate adRegDate, Client client,AdviceAssignment adviceAssignment){
        this.adId = adId;
        this.adPtName = adPtName;
        this.adPtCmt = adPtCmt;
        this.adPtSsNum = adPtSsNum;
        this.adPtSub = adPtSub;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adPtRec = adPtRec;
        this.adEtc = adEtc;
        this.insurance =insurance;
        this.insureDate = insureDate;
        this.insureName = insureName;
        this.adMdDate = adMdDate;
        this.adRegDate = adRegDate;
        this.client = client;
        this.adviceAssignment = adviceAssignment;
    }
}
