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

public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long amId;

    @NotNull
    private String amName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private LocalDate amRegDate;

    private String amContent;


    private LocalDate amMdDate;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;

    @Builder
    private Announcement(Long amId, String amName, LocalDate amRegDate, String amContent, LocalDate amMdDate, Manager manager){
        this.amId = amId;
        this.amName = amName;
        this.amContent = amContent;
        this.amRegDate = amRegDate;
        this.amMdDate = amMdDate;
        this.manager = manager;
    }

    public void updateAnnounce( String amName, LocalDate amRegDate, String amContent, LocalDate amMdDate){

        this.amName = amName;
        this.amContent = amContent;
        this.amRegDate = amRegDate;
        this.amMdDate = amMdDate;
//        this.manager = manager;
    }
}
