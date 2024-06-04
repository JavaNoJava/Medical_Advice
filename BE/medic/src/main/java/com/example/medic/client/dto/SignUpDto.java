package com.example.medic.client.dto;

import com.example.medic.client.domain.Client;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Data
@Getter
@Setter
public class SignUpDto {
    @NotNull
    private String uId;

    @NotNull
    private String uPw;


    @NotNull
    private String uRole;

    private String uName;

    @NotNull
    private String uEmail;

    private String userTel;

    @NotNull
    private String userPhone;
    private String uPart;

    @NotNull
    private String userAddress;

    private String company;

    private String ceo;

    private String cpTel;

    private String cpFx;

    private String cpNum;

    private String cpAddress;


    public static SignUpDto form(Client client){
        return  SignUpDto.builder()
                .uId(client.getUId())
                .uPw(client.getUPw())
                .uEmail(client.getUEmail())
                .uName(client.getUName())
                .userPhone(client.getUserPhone())
                .userTel(client.getUserTel())
                .uRole(client.getURole())
                .userAddress(client.getUserAddress())
                .ceo(client.getCeo())
                .company(client.getCompany())
                .cpAddress(client.getCpAddress())
                .cpFx(client.getCpFx())
                .cpNum(client.getCpNum())
                .cpTel(client.getCpTel())
                .uPart(client.getUPart())
                .build();
    }

}
