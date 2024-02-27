package com.example.medic.qna.dto;

import com.example.medic.manager.domain.Manager;
import com.example.medic.qna.domain.Qna;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
@Getter
public class QnaAnswerResponseDto {
    private Long qaAnswerId;
    private String qaAnswer;    // Qna 답변글
    private Date qaAnswerDate;
    private String mId;

    @Builder
    QnaAnswerResponseDto(Long qaAnswerId, String qaAnswer, Date qaAnswerDate, String mId){
        this.qaAnswerId = qaAnswerId;
        this.qaAnswer = qaAnswer;
        this.qaAnswerDate = qaAnswerDate;
        this.mId = mId;
    }
}
