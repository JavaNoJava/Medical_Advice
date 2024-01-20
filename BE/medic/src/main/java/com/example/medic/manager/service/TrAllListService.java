package com.example.medic.manager.service;


import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.manager.dto.*;
import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.repository.TranslationAssignmentRepository;
import com.example.medic.translation.repository.TranslationRequestFileRepository;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TrAllListService {
    private static final Logger logger = LoggerFactory.getLogger(TrAllListService.class);
    private final TranslationRequestListRepository translationRequestListRepository;
    private final TranslationAssignmentRepository translationAssignmentRepository;
    private final TranslationRequestFileRepository translationRequestFileRepository;
    private final ConsultativeRepository consultativeRepository;

    /*
    번역 목록 조회
     */
    public List<TranslateListDto> trList() {
        List<TranslationRequestList> translationRequestLists = translationRequestListRepository.findAll();
        List<TranslateListDto> translateListDtos = new ArrayList<>();

        for (TranslationRequestList translationRequestList : translationRequestLists) {
            String uName = getClientName(translationRequestList.getClient());

            TranslationRequestFile translationRequestFiles = translationRequestList.getTranslationRequestFile();

                TranslateListDto translateListDto = convertToDTO(translationRequestList, uName, translationRequestFiles);
                translateListDtos.add(translateListDto);

        }

        return translateListDtos;
    }

    /*
    유저 찾기
     */

    private String getClientName(Client client) {
        return (client != null) ? client.getUName() : null;
    }


    /*
    dto 값 설정
     */
    private TranslateListDto convertToDTO(TranslationRequestList translationRequestList, String clientName, TranslationRequestFile translationRequestFile) {
        String admProgressStatus = null;
        if (translationRequestList.getTranslationRequestFile() != null) {
            admProgressStatus = translationRequestList.getTranslationAssignment().getTrProgressStatus();
        }
        TranslationAssignment translationAssignment = translationRequestList.getTranslationAssignment();

        Consultative consultative = translationAssignment.getConsultative();

        String cName = null;
        if (consultative != null){
            cName= consultative.getCName();
        }
        return new TranslateListDto(

               translationRequestList.getTrId(),
                translationRequestList.getTrPtDiagnosis(),
                translationRequestList.getTrRegDate(),
                clientName,
                (translationRequestList.getTranslationAssignment() != null && translationRequestList.getTranslationAssignment().getTamDate() != null) ? translationRequestList.getTranslationAssignment().getTamDate() : null,
                translationRequestFile.getTrAnswerDate()
                ,admProgressStatus
                ,cName
        );
    }

    /*
    배정일, 진행상황 저장
     */
    public void updateAdviceList(List<TranslateListDto> translateListDtos) {

        for (TranslateListDto translateListDto : translateListDtos) {
            Long adviceId = translateListDto.getTrId();

            TranslationAssignment translationAssignment = translationAssignmentRepository.findByTrId(adviceId);
            TranslationRequestFile translationRequestFile = translationRequestFileRepository.findByTrId(adviceId);

            if (translationAssignment != null) {

                TranslationAssignment translationAssignment1 = translationAssignment.toBuilder()
                        .tamDate(translationAssignment.getTamDate())
                        .trProgressStatus(translationAssignment.getTrProgressStatus())
                        .build();
                translationAssignmentRepository.save(translationAssignment1);
            }
            if (translationRequestFile != null) {
                TranslationRequestFile translationRequestFile1 = translationRequestFile.toBuilder()
                        .trAnswerDate(translateListDto.getTrAnswerDate())
                        .build();

                translationRequestFileRepository.save(translationRequestFile1);
            }
        }


    }

    /*
    전문의 조회
     */
    public List<DocSetDto> consultatives(){
        List<Consultative> consultatives = consultativeRepository.findAll();
        List<DocSetDto> docSetDtos = new ArrayList<>();

        for (Consultative consultative : consultatives) {
            DocSetDto docSetDto = setDto(consultative);
            docSetDtos.add(docSetDto);
        }

        return docSetDtos;

    }

    /*
    전문의 배정
     */
    public DocSetDto setDto(Consultative consultative){
        return new DocSetDto(
                consultative.getCName(),
                consultative.getCPhone(),
                consultative.getDepartment(),
                consultative.getHospName(),
                consultative.getHospTel(),
                consultative.getCId()
        );
    }

    /*
    전문의 배정
     */
    public boolean setDoc(Long trId, DocSetDto dto){
        try{
            TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).get();

           TranslationAssignment translationAssignment = translationAssignmentRepository.findByTrId(translationRequestList.getTrId()) ;
            Consultative consultative = consultativeRepository.findById(dto.getCId()).get();
            TranslationAssignment translationAssignment1 =translationAssignment.toBuilder()
                    .consultative(consultative)
                    .build();

            translationAssignmentRepository.save(translationAssignment1);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    /*
    상세페이지
     */

    public TrDetailDto trDetailDto(Long trId){
        TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).get();
        Client client= translationRequestList.getClient();

        TrDetailDto trDetailDto = TrDetailDto.builder()
                .trPtName(translationRequestList.getTrPtName())
                .uName(client.getUName())
                .uId(client.getUId())
                .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                .trEtc(translationRequestList.getTrEtc())
                .userAddress(client.getUserAddress())
                .userPhone(client.getUserPhone())
                .userTel(client.getUserTel())
                .trMdDate(translationRequestList.getTrMdDate())
                .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                .trPtSsNum(translationRequestList.getTrPtSsNum())
                .trPtSub(translationRequestList.getTrPtSub())
                .trEtc(translationRequestList.getTrEtc())
                .trPtDiagContent(translationRequestList.getTrPtDiagContent())
                .build();

        return trDetailDto;
    }


}