package com.example.medic.analyze.domain;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.consultative.domain.Consultative;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class AnalyzeAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long anmId;


    private LocalDate adMdDate;

    private String anProgressStatus;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "anId")
    private AnalyzeRequestList analyzeRequestList;

    @ManyToOne
    @JoinColumn(name = "cId")
    @JsonIgnore
    private Consultative consultative;

    @Builder(toBuilder = true)
    public AnalyzeAssignment(LocalDate adMdDate, Consultative consultative, String anProgressStatus, Long anmId,
                            AnalyzeRequestList analyzeRequestList) {
        this.adMdDate = adMdDate;
        this.consultative = consultative;
        this.anProgressStatus = anProgressStatus;
        this.analyzeRequestList = analyzeRequestList;
        this.anmId = anmId;

    }

    public void updateAdmDate() {
        this.adMdDate = LocalDate.now();

    }

    public void updateStatus( String anProgressStatus) {

        this.anProgressStatus = anProgressStatus;

    }

    public void updateDoc( Consultative consultative
    ) {
        this.consultative = consultative;
    }


    public void setConsultativeToNull() {
        this.consultative = null;
    }
    }
