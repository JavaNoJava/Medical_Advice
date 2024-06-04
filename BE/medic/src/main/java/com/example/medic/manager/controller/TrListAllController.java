package com.example.medic.manager.controller;

import com.example.medic.manager.dto.*;
import com.example.medic.manager.service.AdAllListService;
import com.example.medic.manager.service.TrAllListService;
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
public class TrListAllController {
    private static final Logger logger = LoggerFactory.getLogger(TrListAllController.class);
    private final TrAllListService trAllListService;

    /*
    번역목록 조회
     */
    @GetMapping("/admin/translate/list")
    public ResponseEntity<List<TranslateListDto>> adGetAllList(){
        try{
            List<TranslateListDto> getAllTrList = trAllListService.trList();
            logger.info("translate:{}",getAllTrList);
            return ResponseEntity.ok(getAllTrList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /*
    번역배정일, 진행상황 설정
     */


    @PutMapping("/admin/translate/updateStatus/{trId}")
    public ResponseEntity<Integer> updateAdvice(@PathVariable Long trId,  @RequestBody TranslateListDto translateListDtos){
        try{
            trAllListService.updateAdviceList(trId,translateListDtos);
            return ResponseEntity.ok(1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }

    }

    /*
    전문의 목록
     */
    @GetMapping("/admin/translate/consultativeList")
    public ResponseEntity<List<DocSetDto>> adGetDocList(){
        List<DocSetDto> consultatives =  trAllListService.consultatives();

        return ResponseEntity.ok(consultatives);
    }

    /*
    전문의 배정
     */
    @PostMapping("/admin/translate/setConsultative/{trId}")
    public ResponseEntity<Integer> setAdDoc(@PathVariable Long trId, @RequestBody DocSetDto dto){
        try{
            if(trAllListService.setDoc(trId,dto)){


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
    @GetMapping("/admin/translate/detail/{trId}")
    public ResponseEntity<TrDetailDto> adDetail(@PathVariable Long trId){
        try{
            TrDetailDto trDetailDto = trAllListService.trDetailDto(trId);
            logger.info("adDetail:{}" ,trDetailDto);
            return ResponseEntity.ok(trDetailDto);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/admin/trnaslation/status/{trId}")
    public ResponseEntity<TranslateListDto> trStatus(@PathVariable Long trId){
        try{
            TranslateListDto translateListDto = trAllListService.translateListDto(trId);

            return  ResponseEntity.ok(translateListDto);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
