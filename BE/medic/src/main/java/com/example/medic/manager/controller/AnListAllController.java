package com.example.medic.manager.controller;

import com.example.medic.manager.dto.AdviceListDto;
import com.example.medic.manager.dto.AnDetailDto;
import com.example.medic.manager.dto.AnalyzeListDto;
import com.example.medic.manager.dto.DocSetDto;
import com.example.medic.manager.service.AnAllListService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class AnListAllController {
    private static final Logger logger = LoggerFactory.getLogger(AdListAllController.class);
    private final AnAllListService anAllListService;

    /*
    분석의뢰 목록 조회
     */
    @GetMapping("/admin/analyze/list")
    public ResponseEntity<List<AnalyzeListDto>> adGetAllList(){
        try{
            List<AnalyzeListDto> getAllAnList = anAllListService.anList();
            logger.info("getAllAnList:{}" , getAllAnList);
            return ResponseEntity.ok(getAllAnList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /*
    답변 배정일 , 진행상황
     */

    @PutMapping("/admin/analyze/updateStatus/{anId}")
    public ResponseEntity<Integer> updateAdvice(@PathVariable Long anId ,@RequestBody AnalyzeListDto analyzeListDtos){
        try{

            anAllListService.updateAdviceList(anId,analyzeListDtos);
            return ResponseEntity.ok(1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    /*
    전문의 목록 조회
     */
    @GetMapping("/admin/analyze/consultativeList")
    public ResponseEntity<List<DocSetDto>> adGetDocList(){
        List<DocSetDto> consultatives =  anAllListService.consultatives();

        return ResponseEntity.ok(consultatives);
    }

    /*
    전문의 배정
     */
    @PostMapping("/admin/analyze/setConsultative/{anId}")
    public ResponseEntity<Integer> setAdDoc(@PathVariable Long anId, @RequestBody DocSetDto dto){
        try{
            if(anAllListService.setDoc(anId,dto)){


                return ResponseEntity.ok(1);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }

    /*
    상세페이지 조회
     */
    @GetMapping("/admin/analyze/detail/{anId}")
    public ResponseEntity<AnDetailDto> adDetail(@PathVariable Long anId){
        try{

            AnDetailDto anDetailDto = anAllListService.anDetailDto(anId);
            logger.info("adDetail:{}" ,anId);
            return ResponseEntity.ok(anDetailDto);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/admin/analyze/status/{anId}")
    public ResponseEntity<AnalyzeListDto> anStatus(@PathVariable Long anId){
        try{
            AnalyzeListDto analyzeListDto = anAllListService.analyzeListDto(anId);
            return  ResponseEntity.ok(analyzeListDto);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
