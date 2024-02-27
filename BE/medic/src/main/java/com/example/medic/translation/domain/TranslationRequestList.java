package com.example.medic.translation.domain;

import com.example.medic.client.domain.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;


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

    @NotNull
    private String trPtDiagContent;

    @NotNull
    private String trEtc;

    private LocalDate trRegDate;

    private LocalDate trMdDate;

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

    @Builder(toBuilder = true)
    private TranslationRequestList(Long trId, String trPtName, String trPtSsNum, String trPtSub,
                                   String trPtDiagnosis, String trPtDiagContent, String trEtc,
                                   LocalDate trRegDate, LocalDate trMdDate, Client client) {
        this.trId = trId;
        this.trPtName = trPtName;
        this.trPtSsNum = trPtSsNum;
        this.trPtSub = trPtSub;
        this.trPtDiagnosis = trPtDiagnosis;
        this.trPtDiagContent = trPtDiagContent;
        this.trEtc = trEtc;
        this.trRegDate = trRegDate;
        this.trMdDate = trMdDate;
        this.client = client;
    }
}
