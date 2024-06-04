package com.example.medic.analyze.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class AnalyzeQuestionDto {

    private Long anQid;

    private List<String> anQuestionContent;

    private List<String> anAnswerContent;

    private LocalDate anAnswerDate;

    public List<String> getAnAnswerContent() {
        if (anAnswerContent == null) {
            return new ArrayList<>();
        }
        return anAnswerContent;
    }


}
