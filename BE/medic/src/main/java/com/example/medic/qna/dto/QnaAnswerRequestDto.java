package com.example.medic.qna.dto;

import com.example.medic.manager.domain.Manager;
import com.example.medic.qna.domain.Qna;
import com.example.medic.qna.domain.QnaAnswer;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
@Data
@Builder

public class QnaAnswerRequestDto {
    private String qaAnswer;    // Qna 답변글
    private Date qaAnswerDate;

    public static QnaAnswerRequestDto form(QnaAnswer qnaAnswer){
        return QnaAnswerRequestDto.builder()
                .qaAnswer(qnaAnswer.getQaAnswer())
                .qaAnswerDate(qnaAnswer.getQaAnswerDate())
                .build();
    }
}
