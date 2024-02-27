package com.example.medic.consultative.controller;

import com.example.medic.client.controller.ClientController;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.dto.ConsultativeInfoDto;
import com.example.medic.consultative.dto.ModifyConsultativeDto;
import com.example.medic.consultative.service.ConsultativeService;
import com.example.medic.consultative.service.ModifyConsultativeService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@AllArgsConstructor
public class ConsultativeInfoController {

    private final Logger logger = LoggerFactory.getLogger(ConsultativeInfoController.class);

    private final ConsultativeService consultativeService;
    private final ModifyConsultativeService modifyConsultativeService;

    @GetMapping("/consultative/consultativeInfoAll")
    public ResponseEntity<ConsultativeDto> findConsultativeInfoAll(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();

        ConsultativeDto response = consultativeService.findConsultativeInfoAll(consultativeDto);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/consultative/modifyConsultativeInfo")
    public ResponseEntity<?> getModifyConsultativeInfo(HttpServletRequest request,
                                                       @RequestBody ModifyConsultativeDto modifyConsultativeDto) {
        try {
            HttpSession session = request.getSession();
            String cId = (String) session.getAttribute("uId");

            ConsultativeInfoDto consultativeInfoDto = ConsultativeInfoDto.builder()
                    .cId(cId)
                    .build();

            modifyConsultativeService.modifyConsultativeInfo(consultativeInfoDto, modifyConsultativeDto);
            return ResponseEntity.ok("정보 수정 완료!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("오류");
        }
    }

    @PostMapping("/consultative/modifyConsultativePw")
    public ResponseEntity<String> modifyPw(HttpServletRequest request, @RequestBody String consultativePw) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(consultativePw);
            String cPw = jsonNode.get("cPw").asText();

            modifyConsultativeService.modifyConsultativePw(cId, cPw);
            return ResponseEntity.ok("재설정 완료");
        } catch (Exception e) {
            return new ResponseEntity<>("에러 발생", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/consultative/deleteConsultative")
    public ResponseEntity<String> deleteConsultativeInfo(HttpServletRequest request) {
        try {
            HttpSession session = request.getSession();
            String cId = (String) session.getAttribute("uId");

            ConsultativeInfoDto consultativeInfoDto = ConsultativeInfoDto.builder()
                    .cId(cId)
                    .build();
            consultativeService.deleteConsultative(consultativeInfoDto);
            return ResponseEntity.ok("탈퇴 완료");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("오류");
        }
    }
}
