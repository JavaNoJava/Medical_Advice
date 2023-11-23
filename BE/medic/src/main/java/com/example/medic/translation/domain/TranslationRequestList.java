package com.example.medic.translation.domain;

import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.client.domain.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class TranslationRequestList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long trId;

    @NotNull
    private String trPtName;

    @NotNull
    private String trPtSsNum;

    @NotNull
    private String trPtSub;

    @NotNull
    private String trPtDiagnosis;

    private String trPtRec;

    @NotNull
    private String trPtCmt;

    private String trEtc;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date trRegDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date trMdDate;

    @ManyToOne
    @JoinColumn(name = "client_Id")
    @JsonIgnore
    private Client client;

    @OneToOne(mappedBy = "translationRequestList")
    private TranslationRequestFile translationRequestFile;

    @OneToOne(mappedBy = "translationRequestList")
    private TranslationAssignment translationAssignment;

    @OneToOne(mappedBy = "translationRequestList")
    private TranslationAnswerFile translationAnswerFile;



}