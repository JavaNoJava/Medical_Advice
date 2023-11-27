package com.example.medic.advice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Builder
public class AdviceFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long fid;

    private String adReqForm;

    private String adDiagnosis;

    private String adRecord;

    private String adFilm;

    private String adOther;

    @ManyToOne
    @JoinColumn(name = "adId")
    @JsonIgnore
    private AdviceRequestList adviceRequestList;

    @Builder
    public AdviceFile(String adReqForm, String adDiagnosis, String adRecord, String adFilm,
                      String adOther, AdviceRequestList adviceRequestList) {
        this.adReqForm = adReqForm;
        this.adDiagnosis = adDiagnosis;
        this.adRecord = adRecord;
        this.adFilm = adFilm;
        this.adOther = adOther;
        this.adviceRequestList = adviceRequestList;
    }
}
