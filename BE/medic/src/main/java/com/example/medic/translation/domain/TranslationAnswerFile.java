package com.example.medic.translation.domain;

import com.example.medic.consultative.domain.Consultative;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.asm.Advice;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class TranslationAnswerFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long trAnswerId;

    private String trAnswer;

    private LocalDate trAnswerDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trId")
    private TranslationRequestList translationRequestList;

    @ManyToOne
    @JoinColumn(name = "cId")
    @JsonIgnore
    private Consultative consultative;

    @Builder
    TranslationAnswerFile(Long trAnswerId, String trAnswer, LocalDate trAnswerDate, TranslationRequestList translationRequestList, Consultative consultative) {
        this.trAnswerId = trAnswerId;
        this.trAnswer = trAnswer;
        this.trAnswerDate = trAnswerDate;
        this.translationRequestList = translationRequestList;
        this.consultative = consultative;
    }


    @Builder
    public TranslationAnswerFile(Long trAnswerId, String trAnswer, LocalDate trAnswerDate, TranslationRequestList translationRequestList) {
        this.trAnswerId = trAnswerId;
        this.trAnswer = trAnswer;
        this.trAnswerDate = trAnswerDate;
        this.translationRequestList = translationRequestList;
    }
}

