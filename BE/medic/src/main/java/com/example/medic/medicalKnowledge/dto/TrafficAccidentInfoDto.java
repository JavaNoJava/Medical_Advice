package com.example.medic.medicalKnowledge.dto;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class TrafficAccidentInfoDto {
    private String taName;
    private String taInstitution;
    private Date taRegDate;
    private Date taMdDate;
    private String taContent;
    private Manager manager;

    public static TrafficAccidentInfoDto form(TrafficAccidentInfo trafficAccidentInfo) {
        return TrafficAccidentInfoDto.builder()
                .taName(trafficAccidentInfo.getTaName())
                .taInstitution(trafficAccidentInfo.getTaInstitution())
                .taRegDate(trafficAccidentInfo.getTaRegdate())
                .taMdDate(trafficAccidentInfo.getTaMdDate())
                .taContent(trafficAccidentInfo.getTaContent())
                .manager(trafficAccidentInfo.getManager())
                .build();
    }
}
