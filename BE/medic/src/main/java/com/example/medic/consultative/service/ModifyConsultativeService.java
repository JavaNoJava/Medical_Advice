package com.example.medic.consultative.service;

import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.dto.ConsultativeInfoDto;
import com.example.medic.consultative.dto.ModifyConsultativeDto;
import com.example.medic.consultative.repository.ConsultativeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModifyConsultativeService {

    private final ConsultativeRepository consultativeRepository;
    private final  ConsultativeService consultativeService;
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
                .cRole(modifyConsultativeDto.getCRole())
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
}
