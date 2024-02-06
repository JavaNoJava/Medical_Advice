package com.example.medic.analyze.controller;

import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.analyze.dto.AnalyzeQuestionDto;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeUpdateDto;
import com.example.medic.analyze.service.AnalyzeFileService;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.analyze.service.AnalyzeServiceImpl;
import com.example.medic.client.dto.ClientInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class AnalyzeController {

    private final AnalyzeServiceImpl analyzeService;
    private final AnalyzeFileService analyzeFileService;

    /**
     * @return 분석 의뢰 저장
     */


    @PostMapping("analyze/request")
    public ResponseEntity<String> saveAnalyzeRequest(@RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
                                                     @RequestPart(name = "dto") AnalyzeRequestDto analyzeRequestDto,
                                                     HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        String findUId = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(findUId)
                .build();
        if (analyzeService.saveAnalyzeRequest(analyzeRequestDto, clientInfoDto, multipartFiles)) {
            return ResponseEntity.ok().body("분석 의뢰 신청 저장 성공");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
    }

    /**
     * @return 분석의뢰 파일 조회
     */
    @GetMapping("analyze/findrequestfile/{anId}/{filename}")
    public ResponseEntity<?> findAnalyzeFile(@PathVariable Long anId, @PathVariable String filename) {
        try {
            Resource fileResource = analyzeFileService.findAnalyzeRequestFile(anId, filename);
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

    @GetMapping("/analyze/analyzeDetail/{anId}")
    public ResponseEntity<AnalyzeResponseDto> findAnalyzeDetail(@PathVariable Long anId) {
        try {
            AnalyzeResponseDto analyzeResponseDto = analyzeService.getAnalyzeRequestDetail(anId);
            return ResponseEntity.ok(analyzeResponseDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * 분석의뢰 수정
     */
    @PutMapping("/analyze/analyzeDetail/update/{anId}")
    public ResponseEntity<String> updateAnalyzeRequest(@PathVariable Long anId,
                                                       @RequestPart(name = "dto") AnalyzeUpdateDto updateDto,
                                                       @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles) throws IOException {
        boolean updated = analyzeService.updateAnalyzeRequest(anId, updateDto, multipartFiles);

        if (updated) {
            return ResponseEntity.ok("분석의뢰 수정 성공");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Analyze request with ID " + anId + " not found");
        }
    }
}

//    /**
//     * 분석의뢰 질문지 수정
//     */
//    @PutMapping("/analyze/analyzeDetail/updateQuestion/{anId}")
//    public ResponseEntity<String> updateQuestion(@PathVariable Long anId, @RequestBody AnalyzeQuestionDto analyzeQuestionDto) {
//        boolean updated = analyzeService.updateQuestion(anId, analyzeQuestionDto);
//
//        if (updated) {
//            return ResponseEntity.ok("분석의뢰 수정 성공");
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Analyze request with ID " + anId + " not found");
//        }
//    }
//}

