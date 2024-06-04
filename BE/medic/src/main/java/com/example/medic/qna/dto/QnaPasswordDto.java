package com.example.medic.qna.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@Getter
@RequiredArgsConstructor
public class QnaPasswordDto {
    private String qaPw;

    @Builder
    private QnaPasswordDto(String qaPw){
        this.qaPw = qaPw;
    }
}
