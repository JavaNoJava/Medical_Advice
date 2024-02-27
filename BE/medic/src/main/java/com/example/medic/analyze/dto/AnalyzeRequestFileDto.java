package com.example.medic.analyze.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnalyzeRequestFileDto {

    private String anReqForm;

    private String anDiagnosis;

    private String anRecord;

    private String anFilm;

    private String anOther;
}
