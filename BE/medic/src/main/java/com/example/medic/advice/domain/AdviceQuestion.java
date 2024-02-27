package com.example.medic.advice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor
public class AdviceQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long adQid;

    @NotNull
    private String adQuestionContent;


    private String adAnswerContent;


    private LocalDate adAnswerDate;

    @ManyToOne
    @JoinColumn(name = "adId")
    @JsonIgnore
    private AdviceRequestList adviceRequestList;

    @Builder(toBuilder = true)
    public AdviceQuestion(Long adQid, String adQuestionContent, String adAnswerContent, LocalDate adAnswerDate,
                          AdviceRequestList adviceRequestList) {
        this.adQid = adQid;
        this.adQuestionContent = adQuestionContent;
        this.adAnswerContent = adAnswerContent;
        this.adAnswerDate = adAnswerDate;
        this.adviceRequestList = adviceRequestList;
    }

    public void updateAdAnswerDate(LocalDate adAnswerDate) {
        this.adAnswerDate = adAnswerDate;
    }

    public void updateAdAnswerContent(String adAnswerContent) {
        this.adAnswerContent = adAnswerContent;
    }

    public Long getAdId() {
        if (this.adviceRequestList != null) {
            return this.adviceRequestList.getAdId();
        }
        return null;
    }
}
