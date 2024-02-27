package com.example.medic.medicalKnowledge.domain;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.dto.TrafficAccidentInfoDto;
import com.example.medic.medicalKnowledge.dto.WoundInfoDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class WoundInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long woId;

    @NotNull
    private String woName;

    @NotNull
    private String woInstitution;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date woRegdate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date woMdDate;

    @NotNull
    private String woContent;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;

    @Builder
    private WoundInfo(Long woId, String woName, String woInstitution, Date woRegDate, Date woMdDate, String woContent,
                                Manager manager) {
        this.woId = woId;
        this.woName = woName;
        this.woInstitution = woInstitution;
        this.woRegdate = woRegDate;
        this.woMdDate = woMdDate;
        this.woContent = woContent;
        this.manager = manager;
    }

    public void updateWoundInfo(WoundInfoDto woundInfoDto, Manager modifier) {
        this.woName = woundInfoDto.getWoName();
        this.woInstitution = woundInfoDto.getWoInstitution();
        this.woMdDate = woundInfoDto.getWoMdDate();
        this.woContent = woundInfoDto.getWoContent();
        this.manager = modifier;
    }
}
