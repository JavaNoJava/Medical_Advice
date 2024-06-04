package com.example.medic.client.dto;

import com.example.medic.client.domain.Client;
import com.example.medic.client.service.ModifyService;
import com.sun.istack.NotNull;
import lombok.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Getter
@Builder
public class ModifyUserDto {

    private static final Logger logger = LoggerFactory.getLogger(ModifyUserDto.class);

    private String uEmail;

    private String userTel;

    private String userPhone;

    private String userAddress;

    private String company;

    private String ceo;

    private String cpTel;

    private String cpFx;

    private String cpNum;

    private String cpAddress;

    public static ModifyUserDto form(Client client){
        if(client != null) {
            return ModifyUserDto.builder()
                    .uEmail(client.getUEmail())
                    .userTel(client.getUserTel())
                    .userPhone(client.getUserPhone())
                    .userAddress(client.getUserAddress())
                    .company(client.getCompany())
                    .ceo(client.getCeo())
                    .cpTel(client.getCpTel())
                    .cpFx(client.getCpFx())
                    .cpNum(client.getCpNum())
                    .cpAddress(client.getCpAddress())
                    .build();
        } else {
            throw new IllegalArgumentException("Client 객체가 null입니다.");
        }
    }
}
