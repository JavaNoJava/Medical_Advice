package com.example.medic.medicalKnowledge.service;

import com.example.medic.manager.domain.Manager;
import com.example.medic.manager.dto.ManagerInfoDto;
import com.example.medic.manager.repository.ManagerRepository;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import com.example.medic.medicalKnowledge.dto.MedicalNegligenceInfoDto;
import com.example.medic.medicalKnowledge.repository.MedicalNegligenceInfoRepository;
import com.example.medic.medicalKnowledge.repository.MedicalNegligenceInfoRepository.NextMedicalNegligenceInfoDto;
import com.example.medic.medicalKnowledge.repository.MedicalNegligenceInfoRepository.PrevMedicalNegligenceInfoDto;import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MedicalNegligenceInfoService {
    private final MedicalNegligenceInfoRepository medicalNegligenceInfoRepository;
    private final ManagerRepository managerRepository;

    public List<MedicalNegligenceInfo> getAllMedicalNegligenceInfo(){
        return medicalNegligenceInfoRepository.findAll();
    }

    public MedicalNegligenceInfoDto getMedicalNegligenceInfoDetail(Long mnid){
        Optional<MedicalNegligenceInfo> optionalMedicalNegligenceInfo = medicalNegligenceInfoRepository.findById(mnid);

        if(optionalMedicalNegligenceInfo.isPresent()){
            MedicalNegligenceInfo medicalNegligenceInfo = optionalMedicalNegligenceInfo.get();
            if (medicalNegligenceInfo.getMnMdDate() != null) {
                return MedicalNegligenceInfoDto.builder()
                        .mnName(medicalNegligenceInfo.getMnName())
                        .mnRegDate(medicalNegligenceInfo.getMnMdDate())
                        .mnInstitution(medicalNegligenceInfo.getMnInstitution())
                        .mnContent(medicalNegligenceInfo.getMnContent())
                        .build();
            } else {
                return MedicalNegligenceInfoDto.builder()
                        .mnName(medicalNegligenceInfo.getMnName())
                        .mnRegDate(medicalNegligenceInfo.getMnRegdate())
                        .mnInstitution(medicalNegligenceInfo.getMnInstitution())
                        .mnContent(medicalNegligenceInfo.getMnContent())
                        .build();}
        }else{
            return null;
        }
    }

    public MedicalNegligenceInfo insertMedicalNegligenceInfo(MedicalNegligenceInfoDto medicalNegligenceInfoDto,
                                                             ManagerInfoDto writerInfoDto){
        Manager writer = managerRepository.findByMId(writerInfoDto.getMId()).get();
        MedicalNegligenceInfo medicalNegligenceInfo = MedicalNegligenceInfo.builder()
                .mnName(medicalNegligenceInfoDto.getMnName())
                .mnInstitution(medicalNegligenceInfoDto.getMnInstitution())
                .mnRegDate(medicalNegligenceInfoDto.getMnRegDate())
                .mnContent(medicalNegligenceInfoDto.getMnContent())
                .manager(writer)
                .build();

        return medicalNegligenceInfoRepository.save(medicalNegligenceInfo);
    }
    public MedicalNegligenceInfo updateMedicalNegligenceInfo(Long mnid, MedicalNegligenceInfoDto medicalNegligenceInfoDto,
                                                             ManagerInfoDto modifierInfoDto){
        MedicalNegligenceInfo medicalNegligenceInfo = findMedicalNegligenceInfo(mnid);
        Manager modifier = managerRepository.findByMId(modifierInfoDto.getMId()).get();
        if(medicalNegligenceInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        medicalNegligenceInfo.updateMedicalNegligenceInfo(medicalNegligenceInfoDto, modifier);
        return medicalNegligenceInfoRepository.save(medicalNegligenceInfo);
    }
    public void deleteMedicalNegligenceInfo(Long mnid){
        MedicalNegligenceInfo medicalNegligenceInfo = findMedicalNegligenceInfo(mnid);
        if(medicalNegligenceInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        medicalNegligenceInfoRepository.deleteById(mnid);
    }

    public MedicalNegligenceInfo findMedicalNegligenceInfo(Long mnid){
        Optional<MedicalNegligenceInfo> medicalNegligenceInfo = medicalNegligenceInfoRepository.findById(mnid);
        return medicalNegligenceInfo.orElseThrow(() -> new NoSuchElementException());
    }

    /**
     * 검색 기능
     */
    public List<MedicalNegligenceInfo> searchMedicalNegligenceInfo(String keyword) {
        return medicalNegligenceInfoRepository.findByMnNameContaining(keyword);
    }

    /**
     * 이전 글 찾기
     */
    public PrevMedicalNegligenceInfoDto findPrevMedicalNegligenceInfo(Long mnid) {
        PrevMedicalNegligenceInfoDto prevMedicalNegligenceInfoDto = medicalNegligenceInfoRepository.findPrevMedicalNegligence(mnid);
        return prevMedicalNegligenceInfoDto;
    }

    /**
     * 다음 글 찾기
     */
    public NextMedicalNegligenceInfoDto findNextMedicalNegligenceInfo(Long mnid) {
        NextMedicalNegligenceInfoDto nextMedicalNegligenceInfoDto = medicalNegligenceInfoRepository.findNextMedicalNegligence(mnid);
        return nextMedicalNegligenceInfoDto;
    }
}
