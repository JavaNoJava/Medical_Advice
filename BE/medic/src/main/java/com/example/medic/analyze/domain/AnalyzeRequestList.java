package com.example.medic.analyze.domain;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.client.domain.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor

public class AnalyzeRequestList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long anId;

    @NotNull
    @Column(length = 20)
    private String anPtName;

    @NotNull
    @Column(length = 14)
    private String anPtSsNum;

    @NotNull
    @Column(length = 10)
    private String anPtSub;
    @NotNull
    @Column(length = 50)
    private String anPtDiagnosis;

    @NotNull
    @Column(length = 100)
    private String anPtDiagContent;

    @NotNull
    @Column(length = 500)
    private String anEtc;


    private LocalDate anRegDate;


    private LocalDate anMdDate;

    @ManyToOne
    @JoinColumn(name = "client_Id")
    @JsonIgnore
    private Client client;

    @OneToOne(mappedBy = "analyzeRequestList" , cascade = CascadeType.ALL)
    private AnalyzeAssignment analyzeAssignment;

    @OneToMany(mappedBy = "analyzeRequestList" , cascade = CascadeType.ALL)
    private List<AnalyzeRequest> analyzeRequests = new ArrayList<>();

    @OneToMany(mappedBy = "analyzeRequestList" , cascade = CascadeType.ALL)
    private List<AnalyzeRequestFile> analyzeRequestFiles = new ArrayList<>();

    @Builder(toBuilder = true)
    private AnalyzeRequestList(Long anId, String anPtName, String anPtSsNum, String anPtSub, String anPtDiagnosis,

                               String anPtDiagContent, String anEtc, LocalDate anRegDate, LocalDate anMdDate, Client client){

        this.anId = anId;
        this.anPtName = anPtName;
        this.anPtSsNum = anPtSsNum;
        this.anPtSub = anPtSub;
        this.anPtDiagnosis = anPtDiagnosis;
        this.anPtDiagContent = anPtDiagContent;
        this.anEtc = anEtc;
        this.anRegDate = anRegDate;
        this.anMdDate = anMdDate;
        this.client = client;
    }

}
