package com.example.medic.manager.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.Date;

@Getter
public class AdviceListDto {

    private Long adId;
    private String adPtDiagnosis;

    private LocalDate adRegDate;
    private String uName;
    private LocalDate admDate;
    private LocalDate adAnswerDate;
    private String admProgressStatus;
    private String cName;

    @Builder
    public AdviceListDto(Long adId,   String adPtDiagnosis,
                                 LocalDate adRegDate, String uName, LocalDate amdDate, LocalDate adAnswerDate,
                            String admProgressStatus, String cName) {
        this.adId = adId;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adRegDate = adRegDate;
        this.uName = uName;
        this.admDate = amdDate;
        this.adAnswerDate = adAnswerDate;
        this.admProgressStatus = admProgressStatus;
        this.cName = cName;
    }
}
