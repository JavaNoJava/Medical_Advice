package com.example.medic.consultative.controller;

import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.service.ConsultativeAssignmentServiceImpl;
import com.example.medic.consultative.service.ConsultativeFileService;
import com.example.medic.translation.dto.TranslationAnswerFileRequestDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationResponseDto;
import com.example.medic.translation.dto.TranslationSituationDto;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@Controller
@RequiredArgsConstructor
public class ConsultativeController {

    private final ConsultativeAssignmentServiceImpl consultativeAssignmentService;
    private final ConsultativeFileService consultativeFileService;
    /**
     * API 미구현
     * @return 배정 자문 의뢰 목록 조회
     */
    @GetMapping("/consultative/assignedAdvice/list")
    public ResponseEntity<List<AdviceSituationDto>> findAssignAdviceList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        List<AdviceSituationDto> response = consultativeAssignmentService.findAllAssigmentAdvice(consultativeDto);
        return ResponseEntity.ok(response);
    }

    /**
     * API 미구현
     * @return 배정 받은 특정 자문 의뢰 상세 조회
     */
    @GetMapping("/consultative/assignedAdvice/detail/{adId}")
    public ResponseEntity<AllAdviceRequestDto> AssignAdviceDetails(@PathVariable Long adId,
                                                                   HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            AllAdviceRequestDto response = consultativeAssignmentService.findAssigmentAdviceDetail(consultativeDto, adId);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * API 미구현
     * @return 배정 분석 의뢰 목록 조회
     */
    @GetMapping("/consultative/assignedAnalyze/list")
    public ResponseEntity<List<AnalyzeSituationDto>> findAssignAnalyzeList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            List<AnalyzeSituationDto> response = consultativeAssignmentService.findAllAssigmentAnalyze(consultativeDto);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * API 미구현
     * @return 배정 받은 특정 분석 의뢰 상세 조회
     */
    @GetMapping("/consultative/assignedAnalyze/detail/{anId}")
    public ResponseEntity<AnalyzeResponseDto> AssignAnalyzeDetails(@PathVariable Long anId,
                                                                   HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            AnalyzeResponseDto response = consultativeAssignmentService.findAssignmentAnalyzeDetail(consultativeDto, anId);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * API 미구현
     * @return 배정 번역 의뢰 목록 조회
     */
    @GetMapping("/consultative/assignedTranslate/list")
    public ResponseEntity<List<TranslationSituationDto>> findAssignTranslationList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            List<TranslationSituationDto> response = consultativeAssignmentService.findAllAssigmentTranslation(consultativeDto);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * API 미구현
     * @return 배정 받은 특정 번역 의뢰 상세 조회
     */
    @GetMapping("/consultative/assignedTranslate/detail/{trId}")
    public ResponseEntity<TranslationResponseDto> AssignTranslationDetails(@PathVariable Long trId,
                                                                       HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            TranslationResponseDto response = consultativeAssignmentService.findAssignmentTranslationDetail(consultativeDto, trId);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * API 미구현
     * @return 배정 받은 번역 의뢰 답변파일 저장
     */
    @PostMapping("/consultative/assignedTranslate/saveFile/{trId}")
    public ResponseEntity<String> saveTranslationAnswerFile(@RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
                                                            @RequestPart(name = "dto") TranslationAnswerFileRequestDto translationAnswerFileRequestDto,
                                                            @PathVariable Long trId,
                                                            HttpServletRequest request) throws IOException {
        try{
            HttpSession session = request.getSession();
            String cId = (String) session.getAttribute("uId");

            ConsultativeDto consultativeDto = ConsultativeDto.builder()
                    .cId(cId)
                    .build();
            if(consultativeAssignmentService.saveTranslationAnswerFile(consultativeDto, multipartFiles, trId, translationAnswerFileRequestDto)){
                return ResponseEntity.ok("저장되었습니다.");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
        } catch (SizeLimitExceededException e){
            return ResponseEntity.ok().body("파일의 크기가 너무 큽니다.");
        }
    }

    /**
     * 배정 받은 번역 의뢰 답변파일 수정
     */
    @PutMapping("/consultative/assignedTranslate/updateFile/{trId}")
    public ResponseEntity<String> updateTranslationAnswerFile(@RequestPart(name = "files",  required = false) List<MultipartFile> multipartFiles,
                                                              @RequestPart(name = "dto") TranslationAnswerFileRequestDto translationAnswerFileRequestDto,
                                                              @PathVariable Long trId,
                                                              HttpServletRequest request) throws IOException {
        try{
            HttpSession session = request.getSession();
            String cId = (String) session.getAttribute("uId");

            ConsultativeDto consultativeDto = ConsultativeDto.builder()
                    .cId(cId)
                    .build();
            if(consultativeAssignmentService.updateTranslationAnswerFile(consultativeDto, multipartFiles, trId, translationAnswerFileRequestDto)){
                return ResponseEntity.ok("저장되었습니다.");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
        } catch (SizeLimitExceededException e){
            return ResponseEntity.ok("파일의 크기가 너무 큽니다.");
        }
    }

    /**
     * API 미구현
     * @return 번역 의뢰 답변파일 조회
     */
    @GetMapping("/assignedTranslate/findFile/{trId}")
    public ResponseEntity<?> findTranslationAnswerFile(@PathVariable Long trId){
        try {
            Resource fileResource = consultativeFileService.findTranslationAnswerFile(trId);
            if (fileResource != null) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResource.getFilename() + "\"")
                        .body(fileResource);
            } else {
                System.out.println(64);
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * 배정받은 자문의뢰 갯수 조회
     */
    @GetMapping("/consultative/myPage/assignedAdvice")
    public ResponseEntity<Integer> getAssignmentAdviceCount(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        if (cId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            int assignmentAdviceCount = consultativeAssignmentService.getAssignmentAdviceCount(cId);
            return ResponseEntity.ok(assignmentAdviceCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * 배정받은 분석의뢰 갯수 조회
     */
    @GetMapping("/consultative/myPage/assignedAnalyze")
    public ResponseEntity<Integer> getAssignmentAnalyzeCount(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        if (cId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            int assignmentAnalyzeCount = consultativeAssignmentService.getAssignmentAnalyzeCount(cId);
            return ResponseEntity.ok(assignmentAnalyzeCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * 배정받은 번역의뢰 갯수 조회
     */
    @GetMapping("/consultative/myPage/assignedTranslate")
    public ResponseEntity<Integer> getAssignmentTranslationCount(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        if (cId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            int assignmentTranslationCount = consultativeAssignmentService.getAssignmentTranslationCount(cId);
            return ResponseEntity.ok(assignmentTranslationCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * 배정받은 분석의뢰 답변지 저장
     */
    @PutMapping("/consultative/assignedAnalyze/answer/{anId}")
    public ResponseEntity<String> saveAnalyzeResponse(@RequestBody AnalyzeResponseDto responseDto,
                                                      @PathVariable Long anId) {
        boolean saved = consultativeAssignmentService.saveAnalyzeResponse(responseDto, anId);
        if (saved) {
            return ResponseEntity.ok("분석 의뢰 답변 저장이 완료되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("분석 의뢰 답변 저장 중 오류 발생");
        }
    }

    /**
     * 배정받은 자문의뢰 답변지 저장
     */
    @PutMapping("/consultative/assignedAdvice/answer/{adId}")
    public ResponseEntity<String> saveAdviceResponse(@RequestBody AllAdviceRequestDto responseDto,
                                                      @PathVariable Long adId) {
        boolean saved = consultativeAssignmentService.saveAdviceResponse(responseDto, adId);
        if (saved) {
            return ResponseEntity.ok("자문 의뢰 답변 저장이 완료되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("자문 의뢰 답변 저장 중 오류 발생");
        }
    }
}
