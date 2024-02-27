package com.example.medic.qna.domain;

import com.example.medic.client.domain.Client;
import com.example.medic.manager.domain.Manager;
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
public class Faq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long faqId;

    private LocalDate faqRegDate;

    @NotNull
    private String faqQuestion;

    @NotNull
    private String faqAnswer;

    private LocalDate faqMdDate;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;

    @Builder(toBuilder = true)
    public Faq(Long faqId, LocalDate faqMdDate, String faqQuestion, String faqAnswer, Manager manager, LocalDate faqRegDate){
        this.faqId = faqId;
        this.faqAnswer = faqAnswer;
        this.faqRegDate = faqRegDate;
        this.faqMdDate = faqMdDate;
        this.faqQuestion = faqQuestion;
        this.manager = manager;
    }

    public void updateFaq( LocalDate faqMdDate, String faqQuestion, String faqAnswer,  LocalDate faqRegDate){

        this.faqAnswer = faqAnswer;
        this.faqRegDate = faqRegDate;
        this.faqMdDate = faqMdDate;
        this.faqQuestion = faqQuestion;

    }
}
