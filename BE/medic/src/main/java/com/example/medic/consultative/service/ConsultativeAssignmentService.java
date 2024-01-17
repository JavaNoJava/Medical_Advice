package com.example.medic.consultative.service;

import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationResponseDto;
import com.example.medic.translation.dto.TranslationSituationDto;

import java.util.List;

public interface ConsultativeAssignmentService {

    List<AdviceSituationDto> findAllAssigmentAdvice(ConsultativeDto consultativeDto);

    AllAdviceRequestDto findAssigmentAdviceDetail(ConsultativeDto consultativeDto, AllAdviceRequestDto allAdviceRequestDto);

    List<AnalyzeSituationDto> findAllAssigmentAnalyze(ConsultativeDto consultativeDto);

    AnalyzeResponseDto findAssignmentAnalyzeDetail(ConsultativeDto consultativeDto, AnalyzeRequestDto analyzeRequestDto);

    List<TranslationSituationDto> findAllAssigmentTranslation(ConsultativeDto consultativeDto);

    TranslationResponseDto findAssignmentTranslationDetail(ConsultativeDto consultativeDto, TranslationRequestDto translationRequestDto);
}