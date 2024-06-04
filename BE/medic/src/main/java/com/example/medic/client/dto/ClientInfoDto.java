package com.example.medic.client.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClientInfoDto {

    private String uId;

    private String name;

    private String userTel;

    private String userPhone;

    private String userAddress;

    @Builder
    ClientInfoDto(String uId, String name, String userTel, String userPhone, String userAddress){
        this.uId = uId;
        this.name = name;
        this.userTel = userTel;
        this.userPhone = userPhone;
        this.userAddress = userAddress;
    }

}
