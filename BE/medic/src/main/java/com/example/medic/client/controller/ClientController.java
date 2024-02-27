package com.example.medic.client.controller;

import com.example.medic.client.dto.ClientInfoAllDto;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.dto.LoginDto;
import com.example.medic.client.dto.ModifyUserDto;
import com.example.medic.client.service.ClientService;
import com.example.medic.client.service.ModifyService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@AllArgsConstructor
public class ClientController {
    private final Logger logger = LoggerFactory.getLogger(ClientController.class);



    private final ClientService clientService;
    private final ModifyService modifyService;

    @GetMapping("/user/userInfo")
    public ResponseEntity<ClientInfoDto> findUserInfo(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(uid)
                .build();
        ClientInfoDto response = clientService.findClientInfo(clientInfoDto);
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("/user/userInfoAll")
    public ResponseEntity<ClientInfoAllDto> findUserInfoAll(HttpServletRequest request){
        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");

        ClientInfoAllDto clientInfoAllDto = ClientInfoAllDto.builder()
                .uId(uid)
                .build();
        ClientInfoAllDto response = clientService.findClientInfoAll(clientInfoAllDto);
        return ResponseEntity.ok().body(response);
    }
    @PutMapping ("/user/modifyUserInfo")
    public ResponseEntity<?> getModifyUserInfo(HttpServletRequest request, @RequestBody ModifyUserDto modifyUserDto) {
        try{
            HttpSession session = request.getSession();
            String uid = (String) session.getAttribute("uId");

            ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                    .uId(uid)
                    .build();
            modifyService.modifyUserInfo(clientInfoDto, modifyUserDto);
            return ResponseEntity.ok("정보수정 완료!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("오류");
        }
    }
    @PostMapping("/user/modifyUserPw")
    public ResponseEntity<String> modifyPw(HttpServletRequest request, @RequestBody String userPw) {
        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(userPw);
            String uPw = jsonNode.get("uPw").asText();

            modifyService.modifyUserPw(uid, uPw);
            return ResponseEntity.ok("재설정 완료");
        } catch (Exception e) {
            return new ResponseEntity<>("에러 발생", HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/user/deleteUser")
    public ResponseEntity<String> deleteUserInfo(HttpServletRequest request){
        try{
            HttpSession session = request.getSession();
            String uid = (String) session.getAttribute("uId");

            ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                    .uId(uid)
                    .build();
            clientService.deleteUser(clientInfoDto);
            return ResponseEntity.ok("탈퇴 완료");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("오류");
        }
    }
}
