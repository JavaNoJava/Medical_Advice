package com.example.medic.consultative.service;

import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.translation.dto.TranslationAnswerFileRequestDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationResponseDto;
import com.example.medic.translation.dto.TranslationSituationDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ConsultativeAssignmentService {

    List<AdviceSituationDto> findAllAssigmentAdvice(ConsultativeDto consultativeDto);

    AllAdviceRequestDto findAssigmentAdviceDetail(ConsultativeDto consultativeDto, Long adId);

    List<AnalyzeSituationDto> findAllAssigmentAnalyze(ConsultativeDto consultativeDto);

    AnalyzeResponseDto findAssignmentAnalyzeDetail(ConsultativeDto consultativeDto, Long anId);

    List<TranslationSituationDto> findAllAssigmentTranslation(ConsultativeDto consultativeDto);

    TranslationResponseDto findAssignmentTranslationDetail(ConsultativeDto consultativeDto, Long trId);

    boolean saveTranslationAnswerFile(ConsultativeDto consultativeDto, List<MultipartFile> multipartFiles, Long trId, TranslationAnswerFileRequestDto translationAnswerFileRequestDto) throws IOException;

    int getAssignmentAdviceCount(String cId);

    int getAssignmentAnalyzeCount(String cId);
    int getAssignmentTranslationCount(String cId);
}
