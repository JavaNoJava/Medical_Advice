package com.example.medic.advice.domain;

import com.example.medic.client.domain.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class DiagnosisRecord {

    @Id
    @GeneratedValue
    @NotNull
    private Long drId;

    @NotNull
    private String hospital;

    @NotNull
    private String admStart;

    @NotNull
    private String admEnd;

    @NotNull
    private String visitStart;

    @NotNull
    private String visitEnd;

    @NotNull
    private String treatCmt;

    @NotNull
    private int diagRound;

    @ManyToOne
    @JoinColumn(name = "adId")
    @JsonIgnore
    private AdviceRequestList adviceRequestList;

    @Builder
    public DiagnosisRecord(String hospital, String admStart, String admEnd, String visitStart,
                           String visitEnd, String treatCmt, int diagRound, AdviceRequestList adviceRequestList) {
        this.hospital = hospital;
        this.admStart = admStart;
        this.admEnd = admEnd;
        this.visitStart = visitStart;
        this.visitEnd = visitEnd;
        this.treatCmt = treatCmt;
        this.diagRound = diagRound;
        this.adviceRequestList = adviceRequestList;
    }

    public void updateDiagnosisRecord(String hospital, String admStart, String admEnd, String visitStart,
                           String visitEnd, String treatCmt, int diagRound) {
        this.hospital = hospital;
        this.admStart = admStart;
        this.admEnd = admEnd;
        this.visitStart = visitStart;
        this.visitEnd = visitEnd;
        this.treatCmt = treatCmt;
        this.diagRound = diagRound;
    }
}
