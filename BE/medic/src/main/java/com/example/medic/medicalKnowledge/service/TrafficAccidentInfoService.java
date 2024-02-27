package com.example.medic.medicalKnowledge.service;

import com.example.medic.manager.domain.Manager;
import com.example.medic.manager.dto.ManagerInfoDto;
import com.example.medic.manager.repository.ManagerRepository;
import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import com.example.medic.medicalKnowledge.dto.TrafficAccidentInfoDto;
import com.example.medic.medicalKnowledge.repository.TrafficAccidentInfoJpaRepository;
import com.example.medic.medicalKnowledge.repository.TrafficAccidentInfoJpaRepository.PrevTrafficAccidentInfoDto;
import com.example.medic.medicalKnowledge.repository.TrafficAccidentInfoJpaRepository.NextTrafficAccidentInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrafficAccidentInfoService {
    private final TrafficAccidentInfoJpaRepository trafficAccidentInfoJpaRepository;
    private final ManagerRepository managerRepository;

    public List<TrafficAccidentInfo> getAllTrafficAccidentInfo(){
        return trafficAccidentInfoJpaRepository.findAll();
    }

    public TrafficAccidentInfoDto getTrafficAccidentInfoDetail(Long iaid){
        Optional<TrafficAccidentInfo> optionalTrafficAccidentInfo = trafficAccidentInfoJpaRepository.findById(iaid);

        if(optionalTrafficAccidentInfo.isPresent()){
            TrafficAccidentInfo trafficAccidentInfo = optionalTrafficAccidentInfo.get();
            if (trafficAccidentInfo.getTaMdDate() != null) {
                return TrafficAccidentInfoDto.builder()
                        .taName(trafficAccidentInfo.getTaName())
                        .taContent(trafficAccidentInfo.getTaContent())
                        .taRegDate(trafficAccidentInfo.getTaMdDate())
                        .taInstitution(trafficAccidentInfo.getTaInstitution())
                        .build();
            } else {
                return TrafficAccidentInfoDto.builder()
                        .taName(trafficAccidentInfo.getTaName())
                        .taContent(trafficAccidentInfo.getTaContent())
                        .taRegDate(trafficAccidentInfo.getTaRegdate())
                        .taInstitution(trafficAccidentInfo.getTaInstitution())
                        .build();
            }
        }else{
            return null;
        }
    }

    public TrafficAccidentInfo insertTrafficAccidentInfo(TrafficAccidentInfoDto trafficAccidentInfoDto,
                                                         ManagerInfoDto writerInfoDto){
        Manager writer = managerRepository.findByMId(writerInfoDto.getMId()).get();
        TrafficAccidentInfo trafficAccidentInfo = TrafficAccidentInfo.builder()
                .taName(trafficAccidentInfoDto.getTaName())
                .taInstitution(trafficAccidentInfoDto.getTaInstitution())
                .taRegDate(trafficAccidentInfoDto.getTaRegDate())
                .taContent(trafficAccidentInfoDto.getTaContent())
                .manager(writer)
                .build();

        return trafficAccidentInfoJpaRepository.save(trafficAccidentInfo);
    }
    public TrafficAccidentInfo updateTrafficAccidentInfo(Long taid, TrafficAccidentInfoDto trafficAccidentInfoDto,
                                                         ManagerInfoDto modifierInfoDto){
        TrafficAccidentInfo trafficAccidentInfo = findTrafficAccidentInfo(taid);
        Manager modifier = managerRepository.findByMId(modifierInfoDto.getMId()).get();
        if(trafficAccidentInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        trafficAccidentInfo.updateTrafficAccidentInfo(trafficAccidentInfoDto, modifier);
        return trafficAccidentInfoJpaRepository.save(trafficAccidentInfo);
    }
    public void deleteTrafficAccidentInfo(Long taid){
        TrafficAccidentInfo trafficAccidentInfo = findTrafficAccidentInfo(taid);
        if(trafficAccidentInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        trafficAccidentInfoJpaRepository.deleteById(taid);
    }

    public TrafficAccidentInfo findTrafficAccidentInfo(Long taid){
        Optional<TrafficAccidentInfo> trafficAccidentInfo = trafficAccidentInfoJpaRepository.findById(taid);
        return trafficAccidentInfo.orElseThrow(() -> new NoSuchElementException());
    }

    /**
     * 검색 기능
     */
    public List<TrafficAccidentInfo> searchTrafficAccidentInfo(String keyword) {
        return trafficAccidentInfoJpaRepository.findByTaNameContaining(keyword);
    }

    /**
     * 이전 글 찾기
     */
    public PrevTrafficAccidentInfoDto findPrevTrafficAccidentInfo(Long woid) {
        PrevTrafficAccidentInfoDto prevTrafficAccidentInfoDto = trafficAccidentInfoJpaRepository.findPrevTrafficAccident(woid);
        return prevTrafficAccidentInfoDto;
    }

    /**
     * 다음 글 찾기
     */
    public NextTrafficAccidentInfoDto findNextTrafficAccidentInfo(Long woid) {
        NextTrafficAccidentInfoDto nextTrafficAccidentInfoDto = trafficAccidentInfoJpaRepository.findNextTrafficAccident(woid);
        return nextTrafficAccidentInfoDto;
    }
}
