package com.example.medic.qna.dto;
import com.example.medic.client.domain.Client;
import com.example.medic.qna.domain.Qna;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class QnaRequestDto {
    private LocalDate qaDate;
    private String qaTitle;     // QNA 제목
    private String qaQuestion;      // QNA 본문 내용
    private boolean qaSecret;
    private String qaPw;
    private Client client;

    public static QnaRequestDto form(Qna qna){
        return QnaRequestDto.builder()
                .qaDate(qna.getQaDate())
                .qaTitle(qna.getQaTitle())
                .qaQuestion(qna.getQaQuestion())
                .qaSecret(qna.isQaSecret())
                .qaPw(qna.getQaPw())
                .client(qna.getClient())
                .build();
    }
    @Builder
    private QnaRequestDto(String qaTitle, LocalDate qaDate, String qaQuestion, boolean qaSecret, String qaPw, Client client){
        this.qaTitle = qaTitle;
        this.qaDate = qaDate;
        this.qaQuestion = qaQuestion;
        this.qaSecret = qaSecret;
        this.qaPw = qaPw;
        this.client = client;
    }
}
