package com.example.medic.medicalKnowledge.domain;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.dto.MedicalNegligenceInfoDto;
import com.example.medic.medicalKnowledge.dto.TrafficAccidentInfoDto;
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
public class TrafficAccidentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long taId;

    @NotNull
    private String taName;

    @NotNull
    private String taInstitution;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date taRegdate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date taMdDate;

    @NotNull
    private String taContent;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;

    @Builder
    private TrafficAccidentInfo(Long taId, String taName, String taInstitution, Date taRegDate, Date taMdDate, String taContent,
                                  Manager manager) {
        this.taId = taId;
        this.taName = taName;
        this.taInstitution = taInstitution;
        this.taRegdate = taRegDate;
        this.taMdDate = taMdDate;
        this.taContent = taContent;
        this.manager = manager;
    }

    public void updateTrafficAccidentInfo(TrafficAccidentInfoDto trafficAccidentInfoDto, Manager modifier) {
        this.taName = trafficAccidentInfoDto.getTaName();
        this.taInstitution = trafficAccidentInfoDto.getTaInstitution();
        this.taMdDate = trafficAccidentInfoDto.getTaMdDate();
        this.taContent = trafficAccidentInfoDto.getTaContent();
        this.manager = modifier;
    }
}
