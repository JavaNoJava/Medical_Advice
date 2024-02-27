package com.example.medic.consultative.dto;

import com.example.medic.consultative.domain.Consultative;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ModifyConsultativeDto {

    private String cRole;

    private String cName;

    private String cEmail;

    private String cTel;

    private String cPhone;

    private String cAddress;

    private String hospName;

    private String hospTel;

    private String department;

    private String hospFx;

    private String hospNum;

    private String hospAddress;

    public static ModifyConsultativeDto form(Consultative consultative) {
        if (consultative != null) {
            return ModifyConsultativeDto.builder()
                    .cRole(consultative.getCRole())
                    .department(consultative.getDepartment())
                    .cEmail(consultative.getCEmail())
                    .cTel(consultative.getCTel())
                    .cPhone(consultative.getCPhone())
                    .cAddress(consultative.getCAddress())
                    .hospName(consultative.getHospName())
                    .hospTel(consultative.getHospTel())
                    .hospFx(consultative.getHospFx())
                    .hospNum(consultative.getHospNum())
                    .hospAddress(consultative.getHospAddress())
                    .build();
        } else {
            throw new IllegalArgumentException("Consultative 객체가 null입니다.");
        }
    }
}
