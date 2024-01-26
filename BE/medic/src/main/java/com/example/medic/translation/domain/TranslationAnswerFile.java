package com.example.medic.translation.domain;

import com.example.medic.consultative.domain.Consultative;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class TranslationAnswerFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long trAnswerId;

    private String trAnswer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trId")
    private TranslationRequestList translationRequestList;

    @ManyToOne
    @JoinColumn(name = "cId")
    @JsonIgnore
    private Consultative consultative;

    @Builder TranslationAnswerFile(Long trAnswerId, String trAnswer, TranslationRequestList translationRequestList, Consultative consultative){
        this.trAnswerId = trAnswerId;
        this.trAnswer = trAnswer;
        this.translationRequestList = translationRequestList;
        this.consultative = consultative;
    }
}
