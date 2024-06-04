package com.example.medic.medicalKnowledge.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PrevInfoDto {
    Long PrevNum;
    String PrevTitle;
}
