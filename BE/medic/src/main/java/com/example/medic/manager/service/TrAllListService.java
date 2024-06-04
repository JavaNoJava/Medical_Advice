package com.example.medic.manager.service;


import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.email.domain.EmailMessage;
import com.example.medic.email.service.EmailService;
import com.example.medic.manager.dto.*;
import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.repository.TranslationAnswerFileRepository;
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
    private final TranslationAnswerFileRepository translationAnswerFileRepository;
    private final EmailService emailService;


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
        TranslationAnswerFile translationAnswerFile = translationRequestList.getTranslationAnswerFile();
        logger.info("transwerdate:{}",translationAnswerFile.getTrAnswerDate());

        return new TranslateListDto(

               translationRequestList.getTrId(),
                translationRequestList.getTrPtDiagnosis(),
                translationRequestList.getTrRegDate(),
                clientName,
                translationAssignment.getTamDate()
                ,admProgressStatus
                ,cName,
                translationAnswerFile.getTrAnswerDate()
        );
    }

    /*
    진행상황 저장
     */
    public boolean updateAdviceList(Long trId, TranslateListDto translateListDto) {

        TranslationAssignment translationAssignment = translationAssignmentRepository.findByTrId(trId);

        if(translationAssignment!=null){

            translationAssignment.updateStatus(translateListDto.getTrProgressStatus());
            translationAssignmentRepository.save(translationAssignment);

            Client client = translationAssignment.getTranslationRequestList().getClient();

            // 결제 상태가 "결제하기"로 변경될 때만 이메일 전송
            if (translateListDto.getTrProgressStatus().equals("결제하기")) {
                String clientEmail = client.getUEmail();
                if (clientEmail != null) {
                    sendPaymentEmail(clientEmail);
                }
            }
            return true;
        }
        return false;
    }

    private void sendPaymentEmail(String recipientEmail) {
        // 이메일 내용 작성
        String subject = "[의료자문분석시스템] 결제 요청 안내";
        String message = "<html><head></head><body><div style=\"background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;\">"
                + "<h2 style=\"color: #333;\">안녕하세요. [의료자문분석시스템] 입니다.</h2>"
                + "<p>귀하가 요청하신 의뢰건의 답변이 완료되었습니다.</p>"
                + "<p>답변은 결제를 완료하신 후 열람 가능합니다.</p>"
                + "<p>감사합니다.</p>"
                + "</div></body></html>";


        // 이메일 전송
        EmailMessage emailMessage = EmailMessage.builder()
                .to(recipientEmail)
                .subject(subject)
                .message(message)
                .build();
        emailService.sendMail(emailMessage);
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

            translationAssignment.updateDoc(consultative);
            translationAssignment.updateAdmDate();

            String consultativeEmail = consultative.getCEmail();
            if (consultativeEmail != null) {
                sendPaymentCEmail(consultativeEmail);
            }

            translationAssignmentRepository.save(translationAssignment);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    private void sendPaymentCEmail(String recipientEmail) {
        // 이메일 내용 작성
        String subject = "[의료자문분석시스템] 의뢰 배정 안내";
        String message = "<html><head></head><body><div style=\"background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;\">"
                + "<h2 style=\"color: #333;\">안녕하세요. [의료자문분석시스템] 입니다.</h2>"
                + "<p>귀하에게 의뢰가 배정되었습니다.</p>"
                + "<p>배정된 의뢰를 확인하신 후, 답변 부탁드립니다.</p>"
                + "<p>감사합니다.</p>"
                + "</div></body></html>";


        // 이메일 전송
        EmailMessage emailMessage = EmailMessage.builder()
                .to(recipientEmail)
                .subject(subject)
                .message(message)
                .build();
        emailService.sendMail(emailMessage);
    }

    /*
    상세페이지
     */

    public TrDetailDto trDetailDto(Long trId){
        TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).get();
        Client client= translationRequestList.getClient();
        TranslationRequestFile translationRequestFile = translationRequestFileRepository.findByTrId(trId);
        TranslationAnswerFile translationAnswerFile = translationAnswerFileRepository.findAnswerFileById(trId);

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
                .trMtl(translationRequestFile.getTrMtl())
                .trAnswer(translationAnswerFile.getTrAnswer())
                .build();

        return trDetailDto;
    }

    public TranslateListDto translateListDto(Long trId){
        TranslationAssignment translationAssignment = translationAssignmentRepository.findByTrId(trId);
        TranslationRequestList translationRequestList = translationAssignment.getTranslationRequestList();
        TranslationAnswerFile translationAnswerFile = translationAnswerFileRepository.findAnswerFileById(trId);

        Client client  = translationRequestList.getClient();
        logger.info("trid4:{}",client.getUName());
        TranslateListDto translateListDto = TranslateListDto.builder()
                .trId(trId)
                .tamDate(translationAssignment.getTamDate())
                .trRegDate(translationRequestList.getTrRegDate())
                .uName(client.getUName())
                .trProgressStatus(translationAssignment.getTrProgressStatus())
                .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                .trAnswerDate(translationAnswerFile.getTrAnswerDate())
                .build();

        return translateListDto;
    }



}
