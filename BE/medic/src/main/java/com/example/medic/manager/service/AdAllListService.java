package com.example.medic.manager.service;

import com.example.medic.advice.domain.*;
import com.example.medic.advice.repository.AdviceAssignmentRepository;
import com.example.medic.advice.repository.AdviceFileRepository;
import com.example.medic.advice.repository.AdviceQuestionRepository;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.manager.dto.AdDetailDto;
import com.example.medic.manager.dto.AdviceListDto;
import com.example.medic.manager.dto.DocSetDto;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AdAllListService {
    private static final Logger logger = LoggerFactory.getLogger(AdAllListService.class);
    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AdviceQuestionRepository adviceQuestionRepository;
    private final ConsultativeRepository consultativeRepository;
    private final AdviceFileRepository adviceFileRepository;


    /*
    자문 목록 조회
     */
    public List<AdviceListDto> adList() {
        List<AdviceRequestList> adviceRequestLists = adviceRequestListRepository.findAll();
        Map<Long, AdviceListDto> adviceListDtoMap = new HashMap<>();

        for (AdviceRequestList adviceRequestList : adviceRequestLists) {
            String uName1 = adviceRequestList.getClient().getUName();
            List<AdviceQuestion> adviceQuestions = adviceRequestList.getAdviceQuestions();

            for (AdviceQuestion adviceQuestion : adviceQuestions) {
                AdviceListDto adviceListDto = convertToDTO(adviceRequestList, uName1, adviceQuestions);

                if (!adviceListDtoMap.containsKey(adviceListDto.getAdId())) {
                    adviceListDtoMap.put(adviceListDto.getAdId(), adviceListDto);
                }
            }
        }

        return new ArrayList<>(adviceListDtoMap.values());
    }

    private AdviceListDto convertToDTO(AdviceRequestList adviceRequestList, String clientName, List<AdviceQuestion> adviceQuestions) {
        String admProgressStatus = null;
        if (adviceRequestList.getAdviceAssignment() != null) {
            admProgressStatus = adviceRequestList.getAdviceAssignment().getAdmProgressStatus();
        }
        AdviceAssignment adviceAssignment = adviceRequestList.getAdviceAssignment();
        Consultative consultative = adviceAssignment.getConsultative();
        String cName = null;
        if (consultative != null) {
            cName = consultative.getCName();
        }

        // 하나라도 adAnswerDate가 null인지 확인
        boolean anyNull = false;
        for (AdviceQuestion adviceQuestion : adviceQuestions) {
            if (adviceQuestion.getAdAnswerDate() == null) {
                anyNull = true;
                break;
            }
        }

        // 하나라도 null이 있으면 null 반환
        if (anyNull) {
            return new AdviceListDto(
                    adviceRequestList.getAdId(),
                    adviceRequestList.getAdPtDiagnosis(),
                    adviceRequestList.getAdRegDate(),
                    clientName,
                    (adviceRequestList.getAdviceAssignment() != null && adviceRequestList.getAdviceAssignment().getAdmDate() != null) ? adviceRequestList.getAdviceAssignment().getAdmDate() : null,
                    null,
                    admProgressStatus,
                    cName
            );
        } else {
            // 하나도 null이 없으면 첫 번째 adAnswerDate 반환
            return new AdviceListDto(
                    adviceRequestList.getAdId(),
                    adviceRequestList.getAdPtDiagnosis(),
                    adviceRequestList.getAdRegDate(),
                    clientName,
                    (adviceRequestList.getAdviceAssignment() != null && adviceRequestList.getAdviceAssignment().getAdmDate() != null) ? adviceRequestList.getAdviceAssignment().getAdmDate() : null,
                    adviceQuestions.get(0).getAdAnswerDate(),
                    admProgressStatus,
                    cName
            );
        }
    }


    /*
  유저조회
   */
    private String getClientName(Client client) {
        return (client != null) ? client.getUName() : null;
    }

    /*
    진행상황 수정
     */
    public boolean updateAdviceList( Long adId ,AdviceListDto adviceListDto) {

        AdviceAssignment adviceAssignment = adviceAssignmentRepository.findByAdId(adId);
        if(adviceAssignment != null){
            adviceAssignment.updateStatus(adviceListDto.getAdmProgressStatus());
            adviceAssignmentRepository.save(adviceAssignment);
            return true;
        }
return false;
    }




    /*
    전문의 목록
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
    public boolean setDoc(Long adId, DocSetDto dto){
        try{
            AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adId).get();

            AdviceAssignment adviceAssignment = adviceAssignmentRepository.findByAdId(adviceRequestList.getAdId()) ;
            Consultative consultative = consultativeRepository.findById(dto.getCId()).get();
            adviceAssignment.updateDoc(consultative);
            adviceAssignment.updateAdmDate();

            adviceAssignmentRepository.save(adviceAssignment);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    /*
    상세페이지 조회
     */

    public AdDetailDto adDetailDto(Long adId){
        AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adId).get();
        Client client = adviceRequestList.getClient();
        List<AdviceQuestion> adviceQuestion = adviceQuestionRepository.findByAdIds(adId);
        AdviceFile adviceFile = adviceFileRepository.findByAdviceRequestId(adId);

        logger.info("adviceQuestion:{}",adviceQuestion.get(0));
        AdDetailDto adDetailDto = AdDetailDto.builder()
                .adEtc(adviceRequestList.getAdEtc())
                .adMdDate(adviceRequestList.getAdMdDate())
                .adPtCmt(adviceRequestList.getAdPtCmt())
                .adPtSub(adviceRequestList.getAdPtSub())
                .adPtDiagnosis(adviceRequestList.getAdPtDiagnosis())
                .adPtName(adviceRequestList.getAdPtName())
                .adPtRec(adviceRequestList.getAdPtRec())
                .adRegDate(adviceRequestList.getAdRegDate())
                .adPtSsNum(adviceRequestList.getAdPtSsNum())
                .adMdDate(adviceRequestList.getAdMdDate())
                .insureDate(adviceRequestList.getInsureDate())
                .insureName(adviceRequestList.getInsureName())
                .insurance(adviceRequestList.getInsurance())
                .uId(client.getUId())
                .userAddress(client.getUserAddress())
                .userPhone(client.getUserPhone())
                .userTel(client.getUserTel())
                .uName(client.getUName())
                .hospital(adviceRequestList.getDiagnosisRecords().get(0).getHospital())
                .admStart(adviceRequestList.getDiagnosisRecords().get(0).getAdmStart())
                .admEnd(adviceRequestList.getDiagnosisRecords().get(0).getAdmEnd())
                .visitStart(adviceRequestList.getDiagnosisRecords().get(0).getVisitStart())
                .visitEnd(adviceRequestList.getDiagnosisRecords().get(0).getVisitEnd())
                .treatCmt(adviceRequestList.getDiagnosisRecords().get(0).getTreatCmt())
                .diagRound(adviceRequestList.getDiagnosisRecords().get(0).getDiagRound())
                .adviceQuestions(adviceQuestion)
//                .adQuestionContent(allAdQuestionContents)
//                .adAnswerContent(adviceRequestList.getAdviceQuestions().get(0).getAdAnswerContent())
                .adReqForm(adviceFile.getAdReqForm())
                .adDiagnosis(adviceFile.getAdDiagnosis())
                .adRecord(adviceFile.getAdRecord())
                .adFilm(adviceFile.getAdFilm())
                .adOther(adviceFile.getAdOther())
                .build();
        return adDetailDto;
    }

    public AdviceListDto adviceListDto(Long adId){
        AdviceAssignment adviceAssignment = adviceAssignmentRepository.findByAdId(adId);
        AdviceRequestList adviceRequestList = adviceAssignment.getAdviceRequestList();
        List<AdviceQuestion> adviceQuestion = adviceRequestList.getAdviceQuestions();
        Client client  = adviceRequestList.getClient();
        AdviceListDto adviceListDto = AdviceListDto.builder()
                .adAnswerDate(adviceQuestion.get(0).getAdAnswerDate())
                .adId(adId)
                .admProgressStatus(adviceAssignment.getAdmProgressStatus())
                .uName(client.getUName())
                .adPtDiagnosis(adviceRequestList.getAdPtDiagnosis())
                .amdDate(adviceAssignment.getAdmDate())
                .adRegDate(adviceRequestList.getAdRegDate())
                .build();
        return adviceListDto;
    }

}