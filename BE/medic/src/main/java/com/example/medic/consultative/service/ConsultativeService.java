package com.example.medic.consultative.service;

import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.dto.ConsultativeInfoDto;
import com.example.medic.consultative.repository.ConsultativeRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConsultativeService {

    private final ConsultativeRepository consultativeRepository;

    private final Logger logger = LoggerFactory.getLogger(ConsultativeService.class);

    public Consultative findConsultative(String cId) {
        Optional<Consultative> consultative = consultativeRepository.findByCId(cId);
        return consultative.orElseThrow(() -> new NoSuchElementException());
    }

    public ConsultativeDto findConsultativeInfoAll(ConsultativeDto consultativeDto) {
        try {
            String cId = consultativeDto.getCId();
            Consultative consultative = findConsultative(cId);
            ConsultativeDto respConsultativeInfoAll = ConsultativeDto.builder()
                    .cId(consultative.getCId())
                    .cName(consultative.getCName())
                    .cPw(consultative.getCPw())
                    .cRole(consultative.getCRole())
                    .department(consultative.getDepartment())
                    .cEmail(consultative.getCEmail())
                    .cTel(consultative.getCTel())
                    .cPhone(consultative.getCPhone())
                    .cAddress(consultative.getCAddress())
                    .hospName(consultative.getHospName())
                    .hospTel(consultative.getHospTel())
                    .hospFx(consultative.getHospFx())
                    .hospNum(consultative.getHospNum())
                    .hospAddress(consultative.getHospAddress())
                    .build();
            return respConsultativeInfoAll;
        } catch (NoSuchElementException n) {
            logger.info("해당 전문의를 찾을 수 없습니다.");
            return consultativeDto;
        }
    }

    public void deleteConsultative(ConsultativeInfoDto consultativeInfoDto) {
        String cId = consultativeInfoDto.getCId();
        consultativeRepository.deleteById(cId);
    }
}
