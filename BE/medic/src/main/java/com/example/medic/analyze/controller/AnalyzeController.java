package com.example.medic.analyze.controller;

import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.service.AnalyzeServiceImpl;
import com.example.medic.client.dto.ClientInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class AnalyzeController {

    private final AnalyzeServiceImpl analyzeService;

    /**
     * @return 분석 의뢰 저장
     */

    public ResponseEntity<String> saveAnalyzeRequest(@RequestBody AnalyzeRequestDto analyzeRequestDto,
                                                     HttpServletRequest request) {
        HttpSession session = request.getSession();
        String findUId = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(findUId)
                .build();
        if (analyzeService.saveAnalyzeRequest(analyzeRequestDto, clientInfoDto)) {
            return ResponseEntity.ok().body("분석 의뢰 신청 저장 성공");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
    }
}