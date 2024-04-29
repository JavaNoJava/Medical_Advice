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
public class AdviceFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long fid;

    @Column(length = 300)
    private String adReqForm;

    @Column(length = 300)
    private String adDiagnosis;

    @Column(length = 300)
    private String adRecord;

    @Column(length = 300)
    private String adFilm;

    @Column(length = 300)
    private String adOther;

    @ManyToOne
    @JoinColumn(name = "adId")
    @JsonIgnore
    private AdviceRequestList adviceRequestList;

    @Builder
    public AdviceFile(Long fid, String adReqForm, String adDiagnosis, String adRecord, String adFilm,
                      String adOther, AdviceRequestList adviceRequestList) {
        this.fid = fid;
        this.adReqForm = adReqForm;
        this.adDiagnosis = adDiagnosis;
        this.adRecord = adRecord;
        this.adFilm = adFilm;
        this.adOther = adOther;
        this.adviceRequestList = adviceRequestList;
    }


    public void updateAdviceFile(String adReqForm, String adDiagnosis, String adRecord, String adFilm,
                      String adOther) {
        this.adReqForm = adReqForm;
        this.adDiagnosis = adDiagnosis;
        this.adRecord = adRecord;
        this.adFilm = adFilm;
        this.adOther = adOther;
    }
}
