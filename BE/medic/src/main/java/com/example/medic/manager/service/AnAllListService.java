package com.example.medic.manager.service;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.repository.AnalyzeAssignmentRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.email.domain.EmailMessage;
import com.example.medic.email.service.EmailService;
import com.example.medic.manager.dto.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AnAllListService {

    private static final Logger logger = LoggerFactory.getLogger(AnAllListService.class);
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final AnalyzeAssignmentRepository analyzeAssignmentRepository;
    private final AnalyzeRequestRepository analyzeRequestRepository;
    private final ConsultativeRepository consultativeRepository;
    private final EmailService emailService;

    /*
    번역목록 조회
     */
    public List<AnalyzeListDto> anList() {
        List<AnalyzeRequestList> analyzeRequestLists = analyzeRequestListRepository.findAll();

        Map<Long, AnalyzeListDto> analyzeListDtoMap = new HashMap<>();

        for (AnalyzeRequestList analyzeRequestList : analyzeRequestLists) {
            String uName = getClientName(analyzeRequestList.getClient());
            List<AnalyzeRequest> analyzeRequests = analyzeRequestList.getAnalyzeRequests();

            for (AnalyzeRequest analyzeRequest : analyzeRequests) {
                AnalyzeListDto adviceListDto = convertToDTO(analyzeRequestList, uName, analyzeRequests);

                if (!analyzeListDtoMap.containsKey(adviceListDto.getAnId())) {
                    analyzeListDtoMap.put(adviceListDto.getAnId(), adviceListDto);
                }
            }
        }

        return new ArrayList<>(analyzeListDtoMap.values());
    }

    /*
    유저조회
     */
    private String getClientName(Client client) {
        return (client != null) ? client.getUName() : null;
    }


    /*
    dto 값 설정
     */
    private AnalyzeListDto convertToDTO(AnalyzeRequestList analyzeRequestList, String clientName, List<AnalyzeRequest> analyzeRequests) {
        String admProgressStatus = null;
        if (analyzeRequestList.getAnalyzeAssignment() != null) {
            admProgressStatus = analyzeRequestList.getAnalyzeAssignment().getAnProgressStatus();
        }
        AnalyzeAssignment analyzeAssignment1 = analyzeRequestList.getAnalyzeAssignment();
        LocalDate adMdDate = analyzeAssignment1.getAdMdDate();
        Consultative consultative = analyzeAssignment1.getConsultative();

        String cName = null;
        if (consultative != null) {
            cName = consultative.getCName();
        }

        // 하나라도 anAnswerDate가 null인지 확인
        boolean anyNull = false;
        for (AnalyzeRequest analyzeRequest : analyzeRequests) {
            if (analyzeRequest.getAnAnswerDate() == null) {
                anyNull = true;
                break;
            }
        }

        // 하나라도 null이 있으면 null 반환
        if (anyNull) {
            return new AnalyzeListDto(
                    analyzeRequestList.getAnId(),
                    analyzeRequestList.getAnPtDiagnosis(),
                    analyzeRequestList.getAnRegDate(),
                    clientName,
                    adMdDate,
                    null,
                    admProgressStatus,
                    cName
            );
        } else {
            // 하나도 null이 없으면 첫 번째 anAnswerDate 반환
            return new AnalyzeListDto(
                    analyzeRequestList.getAnId(),
                    analyzeRequestList.getAnPtDiagnosis(),
                    analyzeRequestList.getAnRegDate(),
                    clientName,
                    adMdDate,
                    analyzeRequests.get(0).getAnAnswerDate(),
                    admProgressStatus,
                    cName
            );
        }
    }

    /*
    진행상황 설정
     */

    public boolean updateAdviceList(Long andId , AnalyzeListDto analyzeListDto) {

       AnalyzeAssignment analyzeAssignment = analyzeAssignmentRepository.findByAnId(andId);
       logger.info("aaa:{}",analyzeAssignment.getAdMdDate());
        if(analyzeAssignment != null){
            analyzeAssignment.updateStatus( analyzeListDto.getAnProgressStatus() );
            analyzeAssignmentRepository.save(analyzeAssignment);

            Client client = analyzeAssignment.getAnalyzeRequestList().getClient();

            // 결제 상태가 "결제하기"로 변경될 때만 이메일 전송
            if (analyzeListDto.getAnProgressStatus().equals("결제하기")) {
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

    /*
    의사 배정 dto
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
    의사 배정
     */
    public boolean setDoc(Long anId, DocSetDto dto){
        try{
           AnalyzeRequestList analyzeRequestList = analyzeRequestListRepository.findById(anId).get();

            AnalyzeAssignment analyzeAssignment = analyzeAssignmentRepository.findByAnId(analyzeRequestList.getAnId()) ;
            Consultative consultative = consultativeRepository.findById(dto.getCId()).get();
            analyzeAssignment.updateDoc(consultative);
            analyzeAssignment.updateAdmDate();

            String consultativeEmail = consultative.getCEmail();
            if (consultativeEmail != null) {
                sendPaymentCEmail(consultativeEmail);
            }

            analyzeAssignmentRepository.save(analyzeAssignment);
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
    상세조회페이지
     */
    public AnDetailDto anDetailDto(Long anId){
        AnalyzeRequestList analyzeRequestList = analyzeRequestListRepository.findById(anId).get();
        Client client = analyzeRequestList.getClient();
        List<AnalyzeRequest> analyzeRequests = analyzeRequestRepository.findByAnIds(anId);


       AnDetailDto anDetailDto = AnDetailDto.builder()
               .uId(client.getUId())
               .uName(client.getUName())
               .userAddress(client.getUserAddress())
               .userPhone(client.getUserPhone())
               .userTel(client.getUserTel())
               .anDiagnosis(analyzeRequestList.getAnPtDiagnosis())
               .anPtDiagnosis(analyzeRequestList.getAnPtDiagnosis())
               .anRegDate(analyzeRequestList.getAnRegDate())
               .anEtc(analyzeRequestList.getAnEtc())
               .anFilm(analyzeRequestList.getAnalyzeRequestFiles().get(0).getAnFilm())
               .anPtSub(analyzeRequestList.getAnPtSub())
               .anMdDate(analyzeRequestList.getAnMdDate())
               .anOther(analyzeRequestList.getAnalyzeRequestFiles().get(0).getAnOther())
               .anPtDiagContent(analyzeRequestList.getAnPtDiagContent())
               .anPtName(analyzeRequestList.getAnPtName())
               .anPtSsNum(analyzeRequestList.getAnPtSsNum())
               .anRecord(analyzeRequestList.getAnalyzeRequestFiles().get(0).getAnRecord())
               .anReqForm(analyzeRequestList.getAnalyzeRequestFiles().get(0).getAnReqForm())
               .anDiagnosis(analyzeRequestList.getAnalyzeRequestFiles().get(0).getAnDiagnosis())
               .anRegDate(analyzeRequestList.getAnRegDate())
               .analyzeRequests(analyzeRequests)
               .build();

       return anDetailDto;
    }

    public AnalyzeListDto analyzeListDto(Long anId){

        AnalyzeAssignment analyzeAssignment = analyzeAssignmentRepository.findByAnId(anId);
        AnalyzeRequestList analyzeRequestList = analyzeAssignment.getAnalyzeRequestList();
        List<AnalyzeRequest> analyzeRequests = analyzeRequestList.getAnalyzeRequests();

        Client client  = analyzeRequestList.getClient();

        AnalyzeListDto analyzeListDto = AnalyzeListDto.builder()
                .anAnswerDate(analyzeRequests.get(0).getAnAnswerDate())
                .anProgressStatus(analyzeAssignment.getAnProgressStatus())
                .anId(anId)
                .anRegDate(analyzeRequestList.getAnRegDate())
                .uName(client.getUName())
                .anPtDiagnosis(analyzeRequestList.getAnPtDiagnosis())
                .adMdDate(analyzeAssignment.getAdMdDate())
                .build();
        return analyzeListDto;
    }
}
