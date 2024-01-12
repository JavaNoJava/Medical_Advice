package com.example.medic.analyze.service;

import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeQuestionDto;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeRequestFileDto;
import com.example.medic.analyze.dto.AnalyzeRequestListDto;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;

import java.util.List;

public interface AnalyzeService {

    boolean saveAnalyzeRequest(AnalyzeRequestDto analyzeRequestDto, ClientInfoDto clientInfoDto);

    AnalyzeRequestListDto splitRequestToRequestListDto(AnalyzeRequestDto analyzeRequestDto);

    AnalyzeQuestionDto splitRequestToQuestionDto(AnalyzeRequestDto analyzeRequestDto);

    AnalyzeRequestFileDto splitRequestToRequestFileDto(AnalyzeRequestDto analyzeRequestDto);

    AnalyzeRequestList saveAnalyzeRequestList(AnalyzeRequestListDto analyzeRequestListDto, Client client);

    void saveAnalyzeQuestion(AnalyzeRequestList savedAnalyzeRequestList,
                             AnalyzeQuestionDto analyzeQuestionDto);

    void saveAnalyzeFile(AnalyzeRequestList savedAnalyzeRequestList,
                         AnalyzeRequestFileDto analyzeRequestFileDto);
}
