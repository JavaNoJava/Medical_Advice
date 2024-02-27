package com.example.medic.manager.service;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.repository.AdviceAssignmentRepository;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoAllDto;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.manager.controller.AdListAllController;
import com.example.medic.manager.dto.ManagedClientInfoDto;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientManagementService {

    private static final Logger logger = LoggerFactory.getLogger(ClientManagementService.class);
    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final TranslationRequestListRepository translationRequestListRepository;
    private final TranslationAssignmentRepository translationAssignmentRepository;
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final ClientRepository clientRepository;
    private final TranslationAnswerFileRepository translationAnswerFileRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(ClientManagementService.class);
    private final TranslationRequestFileRepository translationRequestFileRepository;



    /**
     * 일반 회원 목록 조회
     * return 아이디, 이름, 역할, 이메일, 전화 번호, 자문/분석/번역 의뢰 신청 건수
     */
    public List<ManagedClientInfoDto> findAllClient() {
        List<Client> clients = clientRepository.findAll();
        List<ManagedClientInfoDto> managedClientInfoDtoList = new ArrayList<>();
        for (Client client : clients) {
            ManagedClientInfoDto managedClientInfoDto = ManagedClientInfoDto.builder()
                    .uId(client.getUId())
                    .uName(client.getUName())
                    .uRole(client.getURole())
                    .uEmail(client.getUEmail())
                    .userTel(client.getUserTel())
                    .countByAdvice(countByAdvice(client))
                    .countByAnalyze(countByAnalyze(client))
                    .countByTranslate(countByTranslate(client))
                    .build();
            managedClientInfoDtoList.add(managedClientInfoDto);
        }
        return managedClientInfoDtoList;
    }

    /**
     * 회원 분석 의뢰 전체 건수 조회
     */
    public int countByAnalyze(Client client) {
        return analyzeRequestListRepository.countAllByClient(client);
    }

    /**
     * 회원 번역 의뢰 전체 건수 조회
     */
    public int countByTranslate(Client client) {
        return translationRequestListRepository.countAllByClient(client);
    }

    /**
     * 회원 자문 의뢰 전체 건수 조회
     */
    public int countByAdvice(Client client) {
        return adviceRequestListRepository.countAllByClient(client);
    }

    /**
     * 일반 회원 상세 조회
     */
    public ManagedClientInfoDto findDetailByClient(String uId) {
        logger.info("aa:{}",uId);
        Client findClient = clientRepository.findByUId(uId).get();
        ManagedClientInfoDto response = ManagedClientInfoDto.builder()
                .uId(findClient.getUId())
                .uPw(findClient.getUPw())
                .uRole(findClient.getURole())
                .uName(findClient.getUName())
                .uEmail(findClient.getUEmail())
                .userTel(findClient.getUserTel())
                .userPhone(findClient.getUserPhone())
                .userAddress(findClient.getUserAddress())
                .company(findClient.getCompany())
                .ceo(findClient.getCeo())
                .cpTel(findClient.getCpTel())
                .cpFx(findClient.getCpFx())
                .cpNum(findClient.getCpNum())
                .cpAddress(findClient.getCpAddress())
                .countByAdvice(countByAdvice(findClient))
                .countByAnalyze(countByAnalyze(findClient))
                .countByTranslate(countByTranslate(findClient))
                .build();

        return response;
    }

    /**
     * 관리자 일반 회원 수정
     */
    @Transactional
    public boolean updateClient(ManagedClientInfoDto requestManagedClientInfoDto) {
        Client currentClient = clientRepository.findByUId(requestManagedClientInfoDto.getUId()).get();
        if (currentClient == null) {
            LOGGER.info("[Error] {} 유저가 존재하지 않습니다.", requestManagedClientInfoDto.getUId());
            return false;
        }

        currentClient.updateClientByManager(requestManagedClientInfoDto);
        clientRepository.save(currentClient);
        return true;
    }


    /**
     * 관리자 일반 회원 삭제
     */
    @Transactional
    public boolean deleteClient(String uId) {
        Optional<Client> optionalClient = clientRepository.findByUId(uId);
        LOGGER.info("uid:{}",uId);
        if (optionalClient.isEmpty()) {
            LOGGER.info("[Error] {} 유저가 존재하지 않습니다.", uId);
            return false;
        }

        Client currentClient = optionalClient.get();

        List<AdviceRequestList> adviceRequestLists = currentClient.getAdviceRequests();
        for (AdviceRequestList adviceRequestList : adviceRequestLists) {
            Long adId = adviceRequestList.getAdId();
            if (adId != null) {
                adviceAssignmentRepository.deleteById(adId);
            }
        }

        List<TranslationRequestList> translationRequestLists = currentClient.getTranslationRequestLists();
        for(TranslationRequestList translationRequestList : translationRequestLists){
            Long trId = translationRequestList.getTrId();
            if (trId != null) {
                TranslationAssignment translationAssignment = translationRequestList.getTranslationAssignment();
                TranslationAnswerFile translationAnswerFile = translationRequestList.getTranslationAnswerFile();
                TranslationRequestFile translationRequestFile = translationRequestList.getTranslationRequestFile();
                translationAssignmentRepository.delete(translationAssignment);
                translationAnswerFileRepository.delete(translationAnswerFile);
                translationRequestFileRepository.delete(translationRequestFile);
            }
        }

        clientRepository.delete(currentClient);

        return true;
    }

}
