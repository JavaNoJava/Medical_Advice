package com.example.medic.medicalKnowledge.dto;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
public class MedicalNegligenceInfoDto {
    private String mnName;
    private String mnInstitution;
    private LocalDate mnRegDate;
    private LocalDate mnMdDate;
    private String mnContent;
    private Manager manager;

    public static MedicalNegligenceInfoDto form(MedicalNegligenceInfo medicalNegligenceInfo) {
        return MedicalNegligenceInfoDto.builder()
                .mnName(medicalNegligenceInfo.getMnName())
                .mnInstitution(medicalNegligenceInfo.getMnInstitution())
                .mnRegDate(medicalNegligenceInfo.getMnRegdate())
                .mnMdDate(medicalNegligenceInfo.getMnMdDate())
                .mnContent(medicalNegligenceInfo.getMnContent())
                .manager(medicalNegligenceInfo.getManager())
                .build();
    }
}
