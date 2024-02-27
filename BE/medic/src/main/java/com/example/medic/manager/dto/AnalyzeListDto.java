package com.example.medic.manager.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class AnalyzeListDto {
    private Long anId;
    private String anPtDiagnosis;

    private LocalDate anRegDate;
    private String uName;
    private LocalDate adMdDate;
    private LocalDate anAnswerDate;
    private String anProgressStatus;
    private String cName;

    @Builder
    public AnalyzeListDto(Long anId,  String anPtDiagnosis,
                         LocalDate anRegDate, String uName, LocalDate adMdDate, LocalDate anAnswerDate,
                         String anProgressStatus, String cName) {
        this.anId = anId;
        this.anPtDiagnosis = anPtDiagnosis;
        this.anRegDate = anRegDate;
        this.uName = uName;
        this.adMdDate = adMdDate;
        this.anAnswerDate = anAnswerDate;
        this.anProgressStatus = anProgressStatus;
        this.cName = cName;
    }
}
