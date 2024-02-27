package com.example.medic.translation.service;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.TranslationSituationDto;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import com.example.medic.client.dto.ClientInfoDto;
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
public class TranslationSituationService {

    private final Logger logger = LoggerFactory.getLogger(com.example.medic.translation.service.TranslationSituationService.class);
    private final TranslationRequestListRepository translationRequestListRepository;

    /**
     * 번역의뢰 현황 조회
     */
    public List<TranslationSituationDto> getTranslationSituationList(ClientInfoDto clientInfoDto) {
        try {
            String uid = clientInfoDto.getUId();

            List<TranslationRequestList> translationRequestLists = translationRequestListRepository.findByClient_UId(uid);
            Map<Long, TranslationSituationDto> translationSituationDtoMap = new HashMap<>();

            for (TranslationRequestList translationRequestList : translationRequestLists) {
                TranslationAssignment translationAssignment = translationRequestList.getTranslationAssignment();
                TranslationAnswerFile translationAnswerFile = translationRequestList.getTranslationAnswerFile();

                Long trId = translationRequestList.getTrId();
                String trPtSub = translationRequestList.getTrPtSub();
                String trPtDiagnosis = translationRequestList.getTrPtDiagnosis();
                LocalDate trRegDate = translationRequestList.getTrRegDate();
                LocalDate tamDate = translationAssignment != null ? translationAssignment.getTamDate() : null;
                LocalDate trAnswerDate = translationAnswerFile != null ? translationAnswerFile.getTrAnswerDate() : null;
                String trProgressStatus = translationAssignment != null ? translationAssignment.getTrProgressStatus() : null;

                TranslationSituationDto translationSituationDto = new TranslationSituationDto(
                        trId, trPtSub, trPtDiagnosis, trRegDate, tamDate, trAnswerDate, trProgressStatus);

                if (!translationSituationDtoMap.containsKey(trId)) {
                    translationSituationDtoMap.put(trId, translationSituationDto);
                }
                logger.info("TranslationSituationDto created: trId=" + trId);
            }
            return new ArrayList<>(translationSituationDtoMap.values());

        } catch (Exception e) {
            throw new RuntimeException("TranslationSituationList 조회 중 오류 발생", e);
        }
    }


//    private TranslationSituationDto convertToDTO(TranslationRequestList translationRequestList, TranslationAnswerFile translationAnswerFile) {
//        String trProgressStatus = null;
//
//        Optional<TranslationAssignment> translationAssignmentOptional = Optional.ofNullable(translationRequestList.getTranslationAssignment());
//
//        if (translationAssignmentOptional.isPresent()) {
//            TranslationAssignment translationAssignment = translationAssignmentOptional.get();
//            trProgressStatus = translationAssignment.getTrProgressStatus();
//        }
//
//        Consultative consultative = translationAssignmentOptional.map(TranslationAssignment::getConsultative).orElse(null);
//
//        return new TranslationSituationDto(translationRequestList.getTrId(), translationRequestList.getTrPtSub(),
//                translationRequestList.getTrPtDiagnosis(), translationRequestList.getTrRegDate(),
//                (translationAssignmentOptional.map(TranslationAssignment::getTamDate).orElse(null)),
//                translationAnswerFile.getTrAnswerDate(), trProgressStatus);
//    }


    public int getTranslationCount(String uid) {
        try {
            List<TranslationRequestList> translationRequestList = translationRequestListRepository.findByClient_UId(uid);

            return translationRequestList.size();
        } catch (Exception e) {
            throw new RuntimeException("AdviceRequestList 건수 조회 중 오류 발생");
        }
    }
}

