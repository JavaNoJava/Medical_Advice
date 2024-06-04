package com.example.medic.manager.dto;

import lombok.Data;

@Data
public class DocSetDto {
    private String cId;
    private String cName;
    private String cPhone;
    private String department;
    private String hospName;
    private String hospTel;

    public DocSetDto(String cName, String cPhone, String department, String hospName, String hospTel, String cId){
        this.cId= cId;
        this.cName =cName;
        this.cPhone = cPhone;
        this.department = department;
        this.hospName = hospName;
        this.hospTel = hospTel;
    }
}
