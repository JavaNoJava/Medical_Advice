package com.example.medic.advice.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.core.io.Resource;

@Getter
public class AdviceFileResponseDto {
    private String adReqForm;

    private String adDiagnosis;

    private String adRecord;

    private String adFilm;

    private String adOther;
    @Builder
    public AdviceFileResponseDto(String adReqForm, String adDiagnosis, String adRecord, String adFilm, String adOther) {
        this.adReqForm = adReqForm;
        this.adDiagnosis = adDiagnosis;
        this.adRecord = adRecord;
        this.adFilm = adFilm;
        this.adOther = adOther;
    }
}
