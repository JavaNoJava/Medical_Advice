package com.example.medic.analyze.service;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.consultative.domain.Consultative;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class AnalyzeSituationService {

    private final Logger logger = LoggerFactory.getLogger(AnalyzeSituationService.class);
    private final AnalyzeRequestListRepository analyzeRequestListRepository;

    /**
     * 분석의뢰 현황 조회
     */
    public List<AnalyzeSituationDto> getAnalyzeSituationList(ClientInfoDto clientInfoDto) {
        try {
            String uid = clientInfoDto.getUId();

            List<AnalyzeRequestList> analyzeRequestLists = analyzeRequestListRepository.findByClient_UId(uid);
            Map<Long, AnalyzeSituationDto> analyzeSituationDtoMap = new HashMap<>();

            for (AnalyzeRequestList analyzeRequestList : analyzeRequestLists) {
                List<AnalyzeRequest> analyzeRequests = analyzeRequestList.getAnalyzeRequests();

                for (AnalyzeRequest analyzeRequest : analyzeRequests) {
                    AnalyzeSituationDto analyzeSituationDto = convertToDTO(analyzeRequestList, analyzeRequest);

                    if (!analyzeSituationDtoMap.containsKey(analyzeSituationDto.getAnId())) {
                        analyzeSituationDtoMap.put(analyzeSituationDto.getAnId(), analyzeSituationDto);
                    }
                }
            }
            return new ArrayList<>(analyzeSituationDtoMap.values());

        } catch (Exception e) {
            throw new RuntimeException("AnalyzeSituationList 조회 중 오류 발생", e);
        }
    }

    private AnalyzeSituationDto convertToDTO(AnalyzeRequestList analyzeRequestList, AnalyzeRequest analyzeRequest) {
        String anProgressStatus = null;

        Optional<AnalyzeAssignment> analyzeAssignmentOptional = Optional.ofNullable(analyzeRequestList.getAnalyzeAssignment());

        if (analyzeAssignmentOptional.isPresent()) {
            AnalyzeAssignment analyzeAssignment = analyzeAssignmentOptional.get();
            anProgressStatus = analyzeAssignment.getAnProgressStatus();
        }

        Consultative consultative = analyzeAssignmentOptional.map(AnalyzeAssignment::getConsultative).orElse(null);
        LocalDate latestAnswerDate = getLatestAnswerDate(analyzeRequestList);

        return new AnalyzeSituationDto(analyzeRequestList.getAnId(), analyzeRequestList.getAnPtSub(),
                analyzeRequestList.getAnPtDiagnosis(), analyzeRequestList.getAnRegDate(),
                (analyzeAssignmentOptional.map(AnalyzeAssignment::getAdMdDate).orElse(null)),
                latestAnswerDate, anProgressStatus);
    }

    private LocalDate getLatestAnswerDate(AnalyzeRequestList analyzeRequestList) {
        Map<Long, LocalDate> answerDatesMap = new HashMap<>();

        for (AnalyzeRequest analyzeRequest : analyzeRequestList.getAnalyzeRequests()) {
            LocalDate answerDate = analyzeRequest.getAnAnswerDate();
            if (answerDate != null) {
                answerDatesMap.put(analyzeRequest.getAnId(), answerDate);
            } else {
                answerDatesMap.put(analyzeRequest.getAnId(), null); // null일 경우도 기록
            }
        }

        // 동일한 anId를 참조하는 AnalyzeRequest들의 anAnswerDate를 확인
        for (LocalDate answerDate : answerDatesMap.values()) {
            if (answerDate == null) {
                return null; // 하나라도 null이면 null을 반환
            }
        }

        // 모든 AnalyzeRequest들의 anAnswerDate가 null이 아니라면, 가장 최근 값을 반환
        LocalDate latestAnswerDate = null;
        for (LocalDate answerDate : answerDatesMap.values()) {
            if (latestAnswerDate == null || (answerDate != null && answerDate.isAfter(latestAnswerDate))) {
                latestAnswerDate = answerDate;
            }
        }

        return latestAnswerDate;
    }


    public int getAnalyzeCount(String uid) {
        try {
            List<AnalyzeRequestList> analyzeRequestList = analyzeRequestListRepository.findByClient_UId(uid);

            return analyzeRequestList.size();
        } catch (Exception e) {
            throw new RuntimeException("AnalyzeRequestList 건수 조회 중 오류 발생");
        }
    }
}
