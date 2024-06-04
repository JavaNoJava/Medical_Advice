package com.example.medic.analyze.domain;

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
public class AnalyzeRequestFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long anfId;

    @Column(length = 100)
    private String anReqForm;
    @Column(length = 100)
    private String anDiagnosis;
    @Column(length = 100)
    private String anRecord;
    @Column(length = 100)
    private String anFilm;

    @Column(length = 100)
    private String anOther;

    @ManyToOne
    @JoinColumn(name = "anId")
    @JsonIgnore
    private AnalyzeRequestList analyzeRequestList;

    @Builder
    public AnalyzeRequestFile(Long anfId, String anReqForm, String anDiagnosis, String anRecord,
                              String anFilm, String anOther, AnalyzeRequestList analyzeRequestList) {
        this.anfId = anfId;
        this.anReqForm = anReqForm;
        this.anDiagnosis = anDiagnosis;
        this.anRecord = anRecord;
        this.anFilm = anFilm;
        this.anOther = anOther;
        this.analyzeRequestList = analyzeRequestList;
    }


}
