package com.example.medic.qna.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Getter
public class QnaResponseDto {
    private Long qaId;
    private LocalDate qaDate;
    private String qaTitle;     // QNA 제목
    private String qaQuestion;      // QNA 본문 내용
    private boolean qaSecret;
    private String uId;

    @Builder
    QnaResponseDto(Long qaId, LocalDate qaDate, String qaTitle, String qaQuestion, boolean qaSecret, String uId){
        this.qaId = qaId;
        this.qaDate = qaDate;
        this.qaTitle = qaTitle;
        this.qaQuestion = qaQuestion;
        this.qaSecret = qaSecret;
        this.uId = uId;
    }
}
