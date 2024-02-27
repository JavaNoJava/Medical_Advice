package com.example.medic.translation.controller;

import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.translation.dto.TranslationSituationDto;
import com.example.medic.translation.service.TranslationSituationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
public class TranslationSituationController {

    private final TranslationSituationService translationSituationService;

    /**
     * 번역의뢰 현황 조회
     */
    @GetMapping("/user/translate/list")
    public ResponseEntity<List<TranslationSituationDto>> getTranslationSituationList(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(uid)
                .build();
        try {
            List<TranslationSituationDto> translationList = translationSituationService.getTranslationSituationList(clientInfoDto);
            return ResponseEntity.ok(translationList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/user/myPage/myTranslateSituation")
    public ResponseEntity<Integer> getTranslationCount(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");

        if (currentUid == null) {
            // 세션에 사용자 ID가 없으면 세션이 유효하지 않음
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            // AdviceRequestService를 통해 자문의뢰 건수 조회
            int translationRequestCount = translationSituationService.getTranslationCount(currentUid);
            return ResponseEntity.ok(translationRequestCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
