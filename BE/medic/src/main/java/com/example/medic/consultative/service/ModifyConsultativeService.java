package com.example.medic.consultative.service;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.repository.AdviceAssignmentRepository;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.repository.AnalyzeAssignmentRepository;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.dto.ConsultativeInfoDto;
import com.example.medic.consultative.dto.ModifyConsultativeDto;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.manager.dto.ManagedConsultativeInfoDto;
import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.repository.TranslationAnswerFileRepository;
import com.example.medic.translation.repository.TranslationAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModifyConsultativeService {

    private final ConsultativeRepository consultativeRepository;
    private final ConsultativeService consultativeService;
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AnalyzeAssignmentRepository analyzeAssignmentRepository;
    private final TranslationAssignmentRepository translationAssignmentRepository;
    private final TranslationAnswerFileRepository translationAnswerFileRepository;
    private final Logger logger = LoggerFactory.getLogger(ModifyConsultativeService.class);

    public ModifyConsultativeDto modifyConsultativeInfo(ConsultativeInfoDto consultativeInfoDto,
                                                        ModifyConsultativeDto modifyConsultativeDto) {
        String cId = consultativeInfoDto.getCId();
        Consultative consultative = consultativeService.findConsultative(cId);

        if (consultative == null) {
            throw new IllegalArgumentException("전문의를 찾을 수 없습니다.");
        }
        Consultative consultative1 = consultative.builder()
                .cId(consultative.getCId())
                .cName(consultative.getCName())
                .cPw(consultative.getCPw())
                .cRole(consultative.getCRole())
                .department(modifyConsultativeDto.getDepartment())
                .cEmail(modifyConsultativeDto.getCEmail())
                .cTel(modifyConsultativeDto.getCTel())
                .cPhone(modifyConsultativeDto.getCPhone())
                .cAddress(modifyConsultativeDto.getCAddress())
                .hospName(modifyConsultativeDto.getHospName())
                .hospTel(modifyConsultativeDto.getHospTel())
                .hospFx(modifyConsultativeDto.getHospFx())
                .hospNum(modifyConsultativeDto.getHospNum())
                .hospAddress(modifyConsultativeDto.getHospAddress())
                .build();
        Consultative savedConsultative = consultativeRepository.save(consultative1);
        return modifyConsultativeDto.form(savedConsultative);
    }

    public void modifyConsultativePw(String cId, String newCPw) {
        if (newCPw == null) {
            throw new IllegalArgumentException("새로운 비밀번호는 null일 수 없습니다.");
        } try {
            Consultative consultative = consultativeService.findConsultative(cId);
            consultative.updatePassword(newCPw);
            consultativeRepository.save(consultative);
        } catch (Exception e) {
            logger.error("비밀번호 업데이트 중 오류 발생", e);
        }
    }

    @Transactional
    public boolean deleteConsultative(ConsultativeInfoDto consultativeInfoDto) {
        Consultative consultative = consultativeRepository.findById(consultativeInfoDto.getCId()).orElse(null);
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

            List<TranslationAnswerFile> translationAnswerFiles = consultative.getTranslationAnswerFiles();
            for (TranslationAnswerFile translationAnswerFile : translationAnswerFiles) {
                translationAnswerFile.setConsultativeToNull();
                translationAnswerFileRepository.save(translationAnswerFile);
            }
            consultativeRepository.delete(consultative);
            return true;
        } else {
            logger.info("[Error] {} 유저가 존재하지 않습니다.", consultativeInfoDto.getCId());
            return false;
        }
    }
}
