package com.example.medic.analyze.domain;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.consultative.domain.Consultative;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class AnalyzeAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long anmId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adMdDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "anId")
    private AnalyzeRequestList analyzeRequestList;

    @ManyToOne
    @JoinColumn(name = "cId")
    @JsonIgnore
    private Consultative consultative;



}