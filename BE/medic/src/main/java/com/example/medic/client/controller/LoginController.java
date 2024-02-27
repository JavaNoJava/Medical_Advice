package com.example.medic.client.controller;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.LoginDto;
import com.example.medic.client.exception.NotCorrespondingIdException;
import com.example.medic.client.service.LoginService;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.manager.domain.Manager;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;
    private final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
    private final Map<String, HttpSession> sessionList = new HashMap<>();

    @GetMapping("/login")
    public ResponseEntity<String> loginPage(Model model) {
        return new ResponseEntity<>("로그인 페이지입니다.", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto,
                                        HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        try {
            Object success = loginService.login(loginDto);


            // 로그인 성공 -> 세션 생성
            httpServletRequest.getSession().invalidate();
            HttpSession session = httpServletRequest.getSession(true);
            // 세션에 userId를 넣어줌
            String uId = "";
            String uRole = "";
            if (success instanceof Client) {
                uId = ((Client) success).getUId();
                uRole = ((Client) success).getURole();
            } else if (success instanceof Consultative) {
                uId = ((Consultative) success).getCId();
                uRole = ((Consultative) success).getCRole();
            } else if (success instanceof Manager) {
                uId = ((Manager) success).getMId();
                uRole = ((Manager) success).getMRole();
            }
            session.setAttribute("uId", uId);
            session.setMaxInactiveInterval(1800);

            sessionList.put(session.getId(), session);

            // 쿠키에 uId 설정
            Cookie uIdCookie = new Cookie("uId", uId);
            Cookie uRoleCookie = new Cookie("uRole", uRole);

            uIdCookie.setMaxAge(1800);
            uRoleCookie.setMaxAge(1800);

            httpServletResponse.addCookie(uIdCookie);
            httpServletResponse.addCookie(uRoleCookie);

            return new ResponseEntity<>("로그인 성공 - 세션 ID: " + session.getId(), HttpStatus.OK);
        } catch (NotCorrespondingIdException e) {
            return new ResponseEntity<>("로그인 실패 - 아이디가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>("로그인 실패 - 비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            LOGGER.error("로그인 중 오류 발생", e);
            return new ResponseEntity<>("로그인 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/findId")
    public ResponseEntity<String> findId(@RequestBody LoginDto loginDto) {
        String foundId = loginService.findId(loginDto);
        if (foundId != null) {
            return new ResponseEntity<>("회원님의 ID : " + foundId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("일치하는 계정이 없습니다.", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login/findPw")
    public ResponseEntity<String> findPw(@RequestBody LoginDto loginDto) {
        try {
            Optional<Client> optionalClient = loginService.findClient(loginDto);

            if (optionalClient.isPresent()) {
                return new ResponseEntity<>("안녕하세요 " + optionalClient.get().getUName() + "님", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login/findPw/updatePw")
    public ResponseEntity<String> updatePw(@RequestBody LoginDto loginDto) {
        try {
            if (loginService.updatePassword(loginDto)) {
                return new ResponseEntity<>("비밀번호가 재설정 되었습니다.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("비밀번호 설정 중 에러가 발생했습니다.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("에러 발생", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest httpServletRequest) {
        try {
            HttpSession session = httpServletRequest.getSession(false);

            if (session != null) {
                String sessionId = session.getId();
                sessionList.remove(sessionId);
                session.invalidate();

                return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("현재 로그인된 세션이 없습니다.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            LOGGER.error("로그아웃 중 오류 발생", e);
            return new ResponseEntity<>("로그아웃 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

