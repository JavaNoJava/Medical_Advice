package com.example.medic.medicalKnowledge.service;

import com.example.medic.manager.domain.Manager;
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
            MedicalNegligenceInfoDto medicalNegligenceInfoDto = MedicalNegligenceInfoDto.builder()
                    .mnName(medicalNegligenceInfo.getMnName())
                    .mnRegDate(medicalNegligenceInfo.getMnMdDate())
                    .mnInstitution(medicalNegligenceInfo.getMnInstitution())
                    .mnContent(medicalNegligenceInfo.getMnContent())
                    .build();
            return medicalNegligenceInfoDto;
        }else{
            return null;
        }
    }

    public MedicalNegligenceInfo insertMedicalNegligenceInfo(MedicalNegligenceInfoDto medicalNegligenceInfoDto){
//        String managerId = "qkralstj";
//        Manager manager = managerRepository.findById(managerId).get();
//        announcementDto.setMId(managerId);
        MedicalNegligenceInfo medicalNegligenceInfo = MedicalNegligenceInfo.builder()
                .mnName(medicalNegligenceInfoDto.getMnName())
                .mnInstitution(medicalNegligenceInfoDto.getMnInstitution())
                .mnRegDate(medicalNegligenceInfoDto.getMnRegDate())
                .mnContent(medicalNegligenceInfoDto.getMnContent())
                .manager(medicalNegligenceInfoDto.getManager())
                .build();

        return medicalNegligenceInfoRepository.save(medicalNegligenceInfo);
    }
    public MedicalNegligenceInfo updateMedicalNegligenceInfo(Long mnid, MedicalNegligenceInfoDto medicalNegligenceInfoDto){
        MedicalNegligenceInfo medicalNegligenceInfo = findMedicalNegligenceInfo(mnid);
        Manager manager = medicalNegligenceInfoRepository.findManagerByMnid(mnid);
        if(medicalNegligenceInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        MedicalNegligenceInfo updateMedicalNegligenceInfo = medicalNegligenceInfo.builder()
                .mnId(mnid)
                .mnName(medicalNegligenceInfoDto.getMnName())
                .mnInstitution(medicalNegligenceInfoDto.getMnInstitution())
                .mnMdDate(medicalNegligenceInfoDto.getMnMdDate())
                .mnContent(medicalNegligenceInfoDto.getMnContent())
                .manager(manager)
                .build();
        return medicalNegligenceInfoRepository.save(updateMedicalNegligenceInfo);
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
