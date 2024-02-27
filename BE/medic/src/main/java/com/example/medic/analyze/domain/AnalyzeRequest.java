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
public class AnalyzeRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long anQid;

    @NotNull
    private String anQuestionContent;

    private String anAnswerContent;

    private LocalDate anAnswerDate;

    @ManyToOne
    @JoinColumn(name = "anId")
    @JsonIgnore
    private AnalyzeRequestList analyzeRequestList;

    @Builder(toBuilder = true)
    public AnalyzeRequest(Long anQid, String anQuestionContent, String anAnswerContent,
                          LocalDate anAnswerDate, AnalyzeRequestList analyzeRequestList) {
        this.anQid = anQid;
        this.anQuestionContent = anQuestionContent;
        this.anAnswerContent = anAnswerContent;
        this.anAnswerDate = anAnswerDate;
        this.analyzeRequestList = analyzeRequestList;
    }

    public void updateAnAnswerContent(String anAnswerContent) {
        this.anAnswerContent = anAnswerContent;
    }


    public void updateAdAnswerDate(LocalDate anAnswerDate) {
        this.anAnswerDate = anAnswerDate;
    }

    public void updateAnAnswerDate(LocalDate anAnswerDate) {
        this.anAnswerDate = anAnswerDate;
    }

    public Long getAnId() {
        if (this.analyzeRequestList != null) {
            return this.analyzeRequestList.getAnId();
        }
        return null;
    }

}
