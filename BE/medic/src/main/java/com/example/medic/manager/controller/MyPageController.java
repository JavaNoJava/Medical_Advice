package com.example.medic.manager.controller;


import com.example.medic.manager.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class MyPageController {
    private final MyPageService myPageService;

    @GetMapping("/admin/qnaCount")
    public ResponseEntity<Long> qnaRequestCount(){
        try{
            long qnaCount = myPageService.getQnaCount();
            return ResponseEntity.ok(qnaCount);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/admin/adviceCount")
    public ResponseEntity<Long> adviceRequestCount(){
        try{
            long adviceCount = myPageService.getAdviceCount();
            return ResponseEntity.ok(adviceCount);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/admin/analyzeCount")
    public ResponseEntity<Long> analyzeRequestCount(){
        try{
            long analyzeCount = myPageService.getAnalyzeCount();
            return ResponseEntity.ok(analyzeCount);

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/admin/translateCount")
    public ResponseEntity<Long> translateRequestCount(){
        try{
            long translateCount = myPageService.getTranslateCount();
            return ResponseEntity.ok(translateCount);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}