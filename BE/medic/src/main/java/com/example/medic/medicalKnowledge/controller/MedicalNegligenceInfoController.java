package com.example.medic.medicalKnowledge.controller;

import com.example.medic.manager.dto.ManagerInfoDto;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import com.example.medic.medicalKnowledge.dto.MedicalNegligenceInfoDto;
import com.example.medic.medicalKnowledge.repository.MedicalNegligenceInfoRepository.NextMedicalNegligenceInfoDto;
import com.example.medic.medicalKnowledge.repository.MedicalNegligenceInfoRepository.PrevMedicalNegligenceInfoDto;
import com.example.medic.medicalKnowledge.service.MedicalNegligenceInfoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
@Controller
@AllArgsConstructor
public class MedicalNegligenceInfoController {
    private final MedicalNegligenceInfoService medicalNegligenceInfoService;

    //전체 목록조회
    @GetMapping("/medicalNegligence/list")
    public ResponseEntity<?> findMedicalNegligenceInfoAll(){
        try{
            List<MedicalNegligenceInfo> medicalNegligenceInfoList = medicalNegligenceInfoService.getAllMedicalNegligenceInfo();
            return ResponseEntity.ok(medicalNegligenceInfoList);
        }catch (Exception e){
            return new ResponseEntity<>("Error" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //상세 조회
    @GetMapping("/medicalNegligence/detail/{mnid}")
    public ResponseEntity<MedicalNegligenceInfoDto> findMedicalNegligenceInfoDetail(@PathVariable Long mnid){
        try{
            MedicalNegligenceInfoDto medicalNegligenceInfoDto = medicalNegligenceInfoService.getMedicalNegligenceInfoDetail(mnid);
            return ResponseEntity.ok(medicalNegligenceInfoDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //이전 글 조회
    @GetMapping("/medicalNegligence/detail/prev/{mnid}")
    public ResponseEntity<PrevMedicalNegligenceInfoDto> findPrevMedicalNegligenceInfo(@PathVariable Long mnid){
        try{
            PrevMedicalNegligenceInfoDto prevMedicalNegligenceInfoDto = medicalNegligenceInfoService.findPrevMedicalNegligenceInfo(mnid);
            return ResponseEntity.ok(prevMedicalNegligenceInfoDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //다음 글 조회
    @GetMapping("/medicalNegligence/detail/next/{mnid}")
    public ResponseEntity<NextMedicalNegligenceInfoDto> findNextMedicalNegligenceInfo(@PathVariable Long mnid){
        try{
            NextMedicalNegligenceInfoDto nextMedicalNegligenceInfoDto = medicalNegligenceInfoService.findNextMedicalNegligenceInfo(mnid);
            return ResponseEntity.ok(nextMedicalNegligenceInfoDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //등록
    @PostMapping("/medicalNegligence/post")
    public ResponseEntity<String> insertMedicalNegligenceInfo(@RequestBody MedicalNegligenceInfoDto medicalNegligenceInfoDto,
                                                              HttpServletRequest request){
        try{
            HttpSession session = request.getSession();
            String mid = (String) session.getAttribute("uId");

            ManagerInfoDto writerInfoDto = ManagerInfoDto.builder()
                    .mId(mid)
                    .build();
            medicalNegligenceInfoService.insertMedicalNegligenceInfo(medicalNegligenceInfoDto, writerInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //수정
    @PutMapping("/medicalNegligence/modify/{mnid}")
    public ResponseEntity<String> updateMedicalNegligenceInfo(@PathVariable Long mnid, @RequestBody MedicalNegligenceInfoDto medicalNegligenceInfoDto,
                                                              HttpServletRequest request){
        try{
            HttpSession session = request.getSession();
            String mid = (String) session.getAttribute("uId");

            ManagerInfoDto modifierInfoDto = ManagerInfoDto.builder()
                    .mId(mid)
                    .build();
            medicalNegligenceInfoService.updateMedicalNegligenceInfo(mnid, medicalNegligenceInfoDto, modifierInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //삭제
    @PostMapping("/medicalNegligence/delete/{mnid}")
    public ResponseEntity<String> deleteMedicalNegligenceInfo(@PathVariable Long mnid){
        try{
            medicalNegligenceInfoService.deleteMedicalNegligenceInfo(mnid);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 검색 기능
     */
    @GetMapping("/medicalNegligence/search")
    public ResponseEntity<List<MedicalNegligenceInfo>> searchMedicalNegligenceInfo(@RequestParam String keyword) {
        try {
            List<MedicalNegligenceInfo> searchResults = medicalNegligenceInfoService.searchMedicalNegligenceInfo(keyword);
            return ResponseEntity.ok(searchResults);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
