package com.example.medic.advice.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DiagnosisRecordRequestDto {

    private String hospital;

    private String admStart;

    private String admEnd;

    private String visitStart;

    private String visitEnd;

    private String treatCmt;

    private int diagRound;

    @Builder
    public DiagnosisRecordRequestDto(String hospital, String admStart, String admEnd, String visitStart,
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
