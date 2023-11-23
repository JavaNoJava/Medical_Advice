package com.example.medic.qna.domain;

import com.example.medic.client.domain.Client;
import com.example.medic.manager.domain.Manager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class Faq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long faqId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date faqDate;

    @NotNull
    private String faqQuestion;

    @NotNull
    private String faqAnswer;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date faqMdDate;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;
}