package com.example.medic.client.dto;

import com.example.medic.client.domain.Client;
import lombok.*;


@Builder
@Data
public class LoginDto {

    private String uId;
    private String uPw;
    private String uName;
    private String uEmail;
    private String newUpw;
    private String role;

    public static LoginDto form(Client client) {
        return LoginDto.builder()
                .uId(client.getUId())
                .uPw(client.getUPw())
                .uName(client.getUName())
                .uEmail(client.getUEmail())
                .build();
    }
}