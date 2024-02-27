package com.example.medic.consultative.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultativeInfoDto {

    private String cId;

    private String cName;

    private String cTel;

    private String cPhone;

    private String cAddress;

    @Builder
    public ConsultativeInfoDto(String cId, String cName, String cTel, String cPhone, String cAddress) {
        this.cId = cId;
        this.cName = cName;
        this.cTel = cTel;
        this.cPhone = cPhone;
        this.cAddress = cAddress;
    }
}
