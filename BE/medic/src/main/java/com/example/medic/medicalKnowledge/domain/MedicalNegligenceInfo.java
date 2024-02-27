package com.example.medic.medicalKnowledge.domain;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.dto.IndustrialAccidentInfoDto;
import com.example.medic.medicalKnowledge.dto.MedicalNegligenceInfoDto;
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
public class MedicalNegligenceInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long mnId;

    @NotNull
    private String mnName;

    @NotNull
    private String mnInstitution;

    @NotNull
    private LocalDate mnRegdate;
    private LocalDate mnMdDate;

    @NotNull
    private String mnContent;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;

    @Builder
    private MedicalNegligenceInfo(Long mnId, String mnName, String mnInstitution, LocalDate mnRegDate, LocalDate mnMdDate, String mnContent,
                                   Manager manager) {
        this.mnId = mnId;
        this.mnName = mnName;
        this.mnInstitution = mnInstitution;
        this.mnRegdate = mnRegDate;
        this.mnMdDate = mnMdDate;
        this.mnContent = mnContent;
        this.manager = manager;
    }

    public void updateMedicalNegligenceInfo(MedicalNegligenceInfoDto medicalNegligenceInfoDto, Manager modifier) {
        this.mnName = medicalNegligenceInfoDto.getMnName();
        this.mnInstitution = medicalNegligenceInfoDto.getMnInstitution();
        this.mnMdDate = medicalNegligenceInfoDto.getMnMdDate();
        this.mnContent = medicalNegligenceInfoDto.getMnContent();
        this.manager = modifier;
    }
}
