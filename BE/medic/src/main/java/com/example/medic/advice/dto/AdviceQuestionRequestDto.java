package com.example.medic.advice.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Builder
public class AdviceQuestionRequestDto {

    private Long adQid;

    private List<String> adQuestionContent;

    private List<String> adAnswerContent;

    private LocalDate adAnswerDate;

    public List<String> getAdAnswerContent() {
        if (adAnswerContent == null) {
            return new ArrayList<>();
        }
        return adAnswerContent;
    }

}
