package com.example.medic.translation.domain;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDate;


@Entity
@Getter
@NoArgsConstructor
public class TranslationRequestFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long tfId;

    private String trMtl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trId")
    private TranslationRequestList translationRequestList;


    @Builder
    public TranslationRequestFile(Long tfId, String trMtl, TranslationRequestList translationRequestList) {
        this.tfId = tfId;
        this.trMtl = trMtl;
        this.translationRequestList = translationRequestList;
    }
}
