package com.example.medic.manager.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class TranslateListDto {
    private Long trId;
    private String trPtDiagnosis;

    private LocalDate trRegDate;
    private String uName;
    private LocalDate tamDate;
    private String trProgressStatus;
    private String cName;

    @Builder
    public TranslateListDto(Long trId,  String trPtDiagnosis,
                          LocalDate trRegDate, String uName, LocalDate tamDate,
                          String trProgressStatus, String cName) {
        this.trId = trId;
        this.trPtDiagnosis = trPtDiagnosis;
        this.trRegDate = trRegDate;
        this.uName = uName;
        this.tamDate = tamDate;
        this.trProgressStatus = trProgressStatus;
        this.cName = cName;
    }
}
