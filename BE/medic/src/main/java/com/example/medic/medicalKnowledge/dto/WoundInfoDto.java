package com.example.medic.medicalKnowledge.dto;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.WoundInfo;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class WoundInfoDto {
    private String woName;
    private String woInstitution;
    private Date woRegDate;
    private Date woMdDate;
    private String woContent;
    private Manager manager;

    public static WoundInfoDto form(WoundInfo woundInfo) {
        return WoundInfoDto.builder()
                .woName(woundInfo.getWoName())
                .woInstitution(woundInfo.getWoInstitution())
                .woRegDate(woundInfo.getWoRegdate())
                .woMdDate(woundInfo.getWoMdDate())
                .woContent(woundInfo.getWoContent())
                .manager(woundInfo.getManager())
                .build();
    }
}
