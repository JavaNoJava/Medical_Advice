package com.example.medic.translation.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class TranslationAnswerFileRequestDto {
    private String trAnswer;
    private LocalDate trAnswerDate;
}
