package com.example.medic.client.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClientInfoAllDto {

    private String uId;

    private String uPw;

    private String uPart;

    private String name;

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


    @Builder
    public ClientInfoAllDto (String uId, String uPw, String uPart, String name, String uEmail, String userTel, String userPhone, String userAddress,
                             String company, String ceo, String cpTel, String cpFx, String cpNum, String cpAddress){
                this.uId = uId;
                this.uPw = uPw;
                this.uPart = uPart;
                this.name = name;
                this.uEmail = uEmail;
                this.userTel = userTel;
                this.userPhone = userPhone;
                this.userAddress = userAddress;
                this.company = company;
                this.ceo = ceo;
                this.cpTel = cpTel;
                this.cpFx = cpFx;
                this.cpNum = cpNum;
                this.cpAddress = cpAddress;
    }

}
