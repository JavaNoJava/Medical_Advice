package com.example.medic.qna.domain;

import com.example.medic.client.domain.Client;
import com.example.medic.manager.domain.Manager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class QnaAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long qaAnswerId;

    @NotNull
    @Column(length = 500)
    private String qaAnswer;    // Qna 답변글

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private LocalDate qaAnswerDate;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "qa_Id")
    @JsonIgnore
    private Qna qna;

    @ManyToOne
    @JoinColumn(name = "m_Id")
    @JsonIgnore
    private Manager manager;

    @Builder
    private QnaAnswer(Long qaAnswerId, String qaAnswer, LocalDate qaAnswerDate, Qna qna, Manager manager){
        this.qaAnswerId = qaAnswerId;
        this.qaAnswer = qaAnswer;
        this.qaAnswerDate = qaAnswerDate;
        this.qna = qna;
        this.manager = manager;
    }
}
