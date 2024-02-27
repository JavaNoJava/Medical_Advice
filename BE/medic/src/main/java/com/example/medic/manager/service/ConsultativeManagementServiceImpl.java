package com.example.medic.manager.service;


import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.repository.AdviceAssignmentRepository;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.repository.AnalyzeAssignmentRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.manager.dto.ManagedConsultativeInfoDto;
import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.repository.TranslationAssignmentRepository;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsultativeManagementServiceImpl implements ConsultativeManagementService {

    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AnalyzeAssignmentRepository analyzeAssignmentRepository;
    private final TranslationAssignmentRepository translationAssignmentRepository;
    private final ConsultativeRepository consultativeRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(ConsultativeManagementServiceImpl.class);
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * @return 관리자 전문의 목록 조회
     */
    @Override
    public List<ManagedConsultativeInfoDto> findAllConsultative() {
        List<Consultative> consultatives = consultativeRepository.findAll();
        List<ManagedConsultativeInfoDto> managedConsultativeInfoDtoList = new ArrayList<>();
        for (Consultative consultative : consultatives) {
            ManagedConsultativeInfoDto managedConsultativeInfoDto = ManagedConsultativeInfoDto.builder()
                    .cId(consultative.getCId())
                    .cName(consultative.getCName())
                    .cRole(consultative.getCRole())
                    .cEmail(consultative.getCEmail())
                    .cTel(consultative.getCTel())
                    .countByAdviceAssignment(countByAdvice(consultative))
                    .countByAnalyzeAssignment(countByAnalyze(consultative))
                    .countByTranslateAssignment(countByTranslate(consultative))
                    .build();
            managedConsultativeInfoDtoList.add(managedConsultativeInfoDto);
        }
        return managedConsultativeInfoDtoList;
    }

    /**
     * @return 관리자 특정 전문의 정보 상세 조회
     */
    @Override
    public ManagedConsultativeInfoDto viewDoctorManagementDetails(String cId) {
        Consultative findConsultative = consultativeRepository.findById(cId).get();
        ManagedConsultativeInfoDto response = ManagedConsultativeInfoDto.builder()
                .cId(findConsultative.getCId())
                .cPw(findConsultative.getCPw())
                .cRole(findConsultative.getCRole())
                .cName(findConsultative.getCName())
                .cEmail(findConsultative.getCEmail())
                .cTel(findConsultative.getCTel())
                .cPhone(findConsultative.getCPhone())
                .cAddress(findConsultative.getCAddress())
                .department(findConsultative.getDepartment())
                .hospName(findConsultative.getHospName())
                .hospNum(findConsultative.getHospNum())
                .hospTel(findConsultative.getHospTel())
                .hospAddress(findConsultative.getHospAddress())
                .hospFx(findConsultative.getHospFx())
                .countByAdviceAssignment(countByAdvice(findConsultative))
                .countByAnalyzeAssignment(countByAnalyze(findConsultative))
                .countByTranslateAssignment(countByTranslate(findConsultative))
                .build();

        return response;
    }

    /**
     * @return 관리자 특정 전문의 정보 수정
     */
    @Override
    @Transactional
    public boolean updateDoctorManagement(ManagedConsultativeInfoDto managedConsultativeInfoDto) {
        LOGGER.info("cid",managedConsultativeInfoDto.getCId());
        Consultative currentClient = consultativeRepository.findById(managedConsultativeInfoDto.getCId()).get();
        if (currentClient == null) {
            LOGGER.info("[Error] {} 유저가 존재하지 않습니다.", managedConsultativeInfoDto.getCId());
            return false;
        }
        currentClient.updateConsultativeByManager(managedConsultativeInfoDto);
        consultativeRepository.save(currentClient);
        return true;
    }

    /**
     * @return 관리자 특정 전문의 삭제
     */
    /**
     * @return 관리자 특정 전문의 삭제
     */
    @Override
    @Transactional
    public boolean deleteDoctorManagement(ManagedConsultativeInfoDto managedConsultativeInfoDto) {
        Consultative consultative = consultativeRepository.findById(managedConsultativeInfoDto.getCId()).orElse(null);
        if (consultative != null) {
            List<AdviceAssignment> adviceAssignments = consultative.getAdviceAssignments();
            for (AdviceAssignment assignment : adviceAssignments) {
                assignment.setConsultativeToNull();
                adviceAssignmentRepository.save(assignment);
            }

            List<AnalyzeAssignment> analyzeAssignments = consultative.getAnalyzeAssignments();
            for(AnalyzeAssignment analyzeAssignment : analyzeAssignments){
                analyzeAssignment.setConsultativeToNull();
                analyzeAssignmentRepository.save(analyzeAssignment);
            }
            // consultative 테이블의 c_id 값을 null로 설정하거나 다른 값으로 업데이트합니다.

            List<TranslationAssignment> translationAssignments = consultative.getTranslationAssignments();
            for(TranslationAssignment translationAssignment : translationAssignments){
                translationAssignment.setConsultativeToNull();
                translationAssignmentRepository.save(translationAssignment);
            }
            consultativeRepository.delete(consultative);
            return true;
        } else {
            LOGGER.info("[Error] {} 유저가 존재하지 않습니다.", managedConsultativeInfoDto.getCId());
            return false;
        }
    }


    /**
     * 전문의 배정 분석 의뢰 전체 건수 조회
     */
    public int countByAnalyze(Consultative consultative) {
        return analyzeAssignmentRepository.countAllByConsultative(consultative);
    }

    /**
     * 전문의 배정 번역 의뢰 전체 건수 조회
     */
    public int countByTranslate(Consultative consultative) {
        return translationAssignmentRepository.countAllByConsultative(consultative);
    }

    /**
     * 전문의 자문 의뢰 전체 건수 조회
     */
    public int countByAdvice(Consultative consultative) {
        return adviceAssignmentRepository.countAllByConsultative(consultative);
    }

}
