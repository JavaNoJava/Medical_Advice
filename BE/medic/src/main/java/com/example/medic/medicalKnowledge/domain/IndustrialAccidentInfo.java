package com.example.medic.medicalKnowledge.domain;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.dto.IndustrialAccidentInfoDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class IndustrialAccidentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long iaId;

    @NotNull
    private String iaName;

    @NotNull
    private String iaInstitution;

    @NotNull
    private LocalDate iaRegDate;

    private LocalDate iaMdDate;

    @NotNull
    private String iaContent;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;

    @Builder
    private IndustrialAccidentInfo(Long iaId, String iaName, String iaInstitution, LocalDate iaRegDate,
                                   LocalDate iaMdDate, String iaContent, Manager manager){
        this.iaId = iaId;
        this.iaName = iaName;
        this.iaInstitution = iaInstitution;
        this.iaRegDate = iaRegDate;
        this.iaMdDate = iaMdDate;
        this.iaContent = iaContent;
        this.manager = manager;
    }

    public void updateIndustrialAccidentInfo(IndustrialAccidentInfoDto industrialAccidentInfoDto, Manager modifier) {
        this.iaName = industrialAccidentInfoDto.getIaName();
        this.iaInstitution = industrialAccidentInfoDto.getIaInstitution();
        this.iaMdDate = industrialAccidentInfoDto.getIaMdDate();
        this.iaContent = industrialAccidentInfoDto.getIaContent();
        this.manager = modifier;
    }

}
