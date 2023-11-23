package com.example.medic.translation.domain;

import com.example.medic.consultative.domain.Consultative;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class TranslationAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tamId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date tamDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trId")
    private TranslationRequestList translationRequestList;

    @ManyToOne
    @JoinColumn(name = "cId")
    @JsonIgnore
    private Consultative consultative;
}