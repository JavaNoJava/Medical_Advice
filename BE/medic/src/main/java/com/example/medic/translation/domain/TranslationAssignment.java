package com.example.medic.translation.domain;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.consultative.domain.Consultative;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class TranslationAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tamId;

    private LocalDate tamDate;

    private String trProgressStatus;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trId")
    private TranslationRequestList translationRequestList;

    @ManyToOne
    @JoinColumn(name = "cId")
    @JsonIgnore
    private Consultative consultative;

    public void updateStatusAndAdmDate(LocalDate tamDate, String trProgressStatus) {
        this.tamDate = tamDate;
        this.trProgressStatus = trProgressStatus;

    }
    public void updateDoc( Consultative consultative
    ) {
        this.consultative = consultative;

    }

}
