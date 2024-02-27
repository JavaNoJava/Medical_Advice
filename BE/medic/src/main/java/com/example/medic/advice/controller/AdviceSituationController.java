package com.example.medic.advice.controller;

import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.service.AdviceSituationService;
import com.example.medic.client.dto.ClientInfoDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
public class AdviceSituationController {

    private final AdviceSituationService adviceSituationService;

    @GetMapping("/user/advice/list")
    public ResponseEntity<List<AdviceSituationDto>> getAdviceSituationList(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(uid)
                .build();
        try {
            List<AdviceSituationDto> adviceList = adviceSituationService.getAdviceSituationList(clientInfoDto);
            return ResponseEntity.ok(adviceList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/user/myPage/myAdviceSituation")
    public ResponseEntity<Integer> getAdviceCount(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");

        if (currentUid == null) {
            // 세션에 사용자 ID가 없으면 세션이 유효하지 않음
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            // AdviceRequestService를 통해 자문의뢰 건수 조회
            int adviceRequestCount = adviceSituationService.getAdviceCount(currentUid);
            return ResponseEntity.ok(adviceRequestCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}