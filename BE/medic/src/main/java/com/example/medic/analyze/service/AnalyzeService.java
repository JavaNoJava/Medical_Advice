package com.example.medic.analyze.service;

import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.*;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AnalyzeService {

    boolean saveAnalyzeRequest(AnalyzeRequestDto analyzeRequestDto, ClientInfoDto clientInfoDto, List<MultipartFile> multipartFiles) throws IOException;

    AnalyzeRequestListDto splitRequestToRequestListDto(AnalyzeRequestDto analyzeRequestDto);

    AnalyzeQuestionDto splitRequestToQuestionDto(AnalyzeRequestDto analyzeRequestDto);

    AnalyzeRequestFileDto splitRequestToRequestFileDto(AnalyzeRequestDto analyzeRequestDto, List<MultipartFile> multipartFiles) throws IOException;

    AnalyzeRequestList saveAnalyzeRequestList(AnalyzeRequestListDto analyzeRequestListDto, Client client);

    void saveAnalyzeQuestion(AnalyzeRequestList savedAnalyzeRequestList,
                             AnalyzeQuestionDto analyzeQuestionDto);

    void saveAnalyzeFile(AnalyzeRequestList savedAnalyzeRequestList,
                         AnalyzeRequestFileDto analyzeRequestFileDto);

    AnalyzeResponseDto getAnalyzeRequestDetail(Long anId);
}
