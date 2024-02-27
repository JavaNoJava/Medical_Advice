package com.example.medic.client.controller;

import com.example.medic.client.dto.SignUpDto;
import com.example.medic.client.service.SignUpService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class SignUpController {

    private final SignUpService signUpService;
    private final Logger LOGGER = LoggerFactory.getLogger(SignUpController.class);


    //아이디 중복확인
    @GetMapping("/signUp/{uid}")
    public ResponseEntity<Integer> uIdConfirm(@PathVariable String uid){

            if(!signUpService.idConfirm(uid)){
                return ResponseEntity.ok(1);
            }else{
                return ResponseEntity.badRequest().body(0);
            }

    }

    // 회원가입
    @PostMapping("/signUp")
    public ResponseEntity<?> signUpUser(@RequestBody SignUpDto signUpDto){
        try{
            LOGGER.info("signUpDto:{}", signUpDto);
            if(signUpDto == null){
                return ResponseEntity.badRequest().body("정보가 입력되지 않았습니다.");
            }
            signUpService.insertUser(signUpDto);
            return ResponseEntity.ok("회원가입 완료!");
        }catch (Exception e){
            LOGGER.info("signUpDto:{}", signUpDto);
            return ResponseEntity.badRequest().body("오류");
        }
    }
}
