package com.example.medic.medicalKnowledge.dto;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;


@Data
@Builder
public class IndustrialAccidentInfoDto {
    private String iaName;
    private String iaInstitution;
    private LocalDate iaRegDate;
    private LocalDate iaMdDate;
    private String iaContent;
    private Manager manager;

    public static IndustrialAccidentInfoDto form(IndustrialAccidentInfo industrialAccidentInfo) {
        return IndustrialAccidentInfoDto.builder()
                .iaName(industrialAccidentInfo.getIaName())
                .iaInstitution(industrialAccidentInfo.getIaInstitution())
                .iaRegDate(industrialAccidentInfo.getIaRegDate())
                .iaMdDate(industrialAccidentInfo.getIaMdDate())
                .iaContent(industrialAccidentInfo.getIaContent())
                .manager(industrialAccidentInfo.getManager())
                .build();
    }
}
