package com.example.medic.qna.domain;

import com.example.medic.client.domain.Client;
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
public class Qna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long qaId;

    @NotNull
    private LocalDate qaDate;

    @NotNull
    private String qaTitle;     // QNA 제목

    @NotNull
    private String qaQuestion;      // QNA 본문 내용

    private boolean qaSecret;

    private String qaPw;

    @ManyToOne
    @JoinColumn(name = "client_Id")
    @JsonIgnore
    private Client client;

    @Builder
    private Qna(Long qaId, String qaTitle, LocalDate qaDate, String qaQuestion, boolean qaSecret, String qaPw, Client client){
        this.qaId = qaId;
        this.qaTitle = qaTitle;
        this.qaDate = qaDate;
        this.qaQuestion = qaQuestion;
        this.qaSecret = qaSecret;
        this.qaPw = qaPw;
        this.client = client;
    }
}
