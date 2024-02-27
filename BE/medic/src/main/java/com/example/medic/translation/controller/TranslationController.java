package com.example.medic.translation.controller;

import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.analyze.dto.AnalyzeUpdateDto;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.service.TranslationFileService;
import com.example.medic.translation.dto.TranslationResponseDto;
import com.example.medic.translation.service.TranslationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
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
public class TranslationController {

    private final TranslationServiceImpl translationServiceImpl;
    private final TranslationFileService translationFileService;
    /**
     * @return 번역 의뢰 신청 저장
     */
    @PostMapping("/user/translate/request")
    public ResponseEntity<String> saveTranslationRequest(@RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
                                                         @RequestPart(name = "dto") TranslationRequestDto translationRequestDto,
                                                         HttpServletRequest request) throws IOException {
        try{
            HttpSession session = request.getSession();
            String findUId = (String) session.getAttribute("uId");

            ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                    .uId(findUId)
                    .build();
            if (translationServiceImpl.saveTranslationRequest(translationRequestDto, clientInfoDto, multipartFiles)) {
                return ResponseEntity.ok().body("번역 의뢰 신청 저장 성공");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("번역 의뢰 신청 저장 실패");
        } catch (SizeLimitExceededException e){
            return ResponseEntity.ok().body("파일의 크기가 너무 큽니다.");
        }

    }

    /**
     * @return 번역의뢰 파일 조회
     */
    @GetMapping("/translate/findFile/{trId}")
    public ResponseEntity<?> findTranslationFile(@PathVariable Long trId) {
        try {
            Resource fileResource = translationFileService.findTranslationFile(trId);
            if (fileResource != null) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResource.getFilename() + "\"")
                        .body(fileResource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * 번역의뢰 상세 조회
     */
    @GetMapping("/user/translate/translateDetail/{trId}")
    public ResponseEntity<TranslationResponseDto> findTranslationDetail(@PathVariable Long trId){
        try{
            TranslationResponseDto translationResponseDto = translationServiceImpl.getTranslationDetail(trId);
            return ResponseEntity.ok(translationResponseDto);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * 번역의뢰 수정
     */
    @PutMapping("/user/translate/translateDetail/update/{trId}")
    public ResponseEntity<String> updateTranslationRequest(@PathVariable Long trId,
                                                           @RequestPart(name = "dto") TranslationResponseDto updateDto,
                                                           @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles) throws IOException {
        try{
            boolean updated = translationServiceImpl.updateTranslationRequest(trId, updateDto, multipartFiles);

            if (updated) {
                return ResponseEntity.ok("번역의뢰 수정 성공");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Analyze request with ID " + trId + " not found");
            }
        } catch (SizeLimitExceededException e){
            return ResponseEntity.ok("파일의 크기가 너무 큽니다.");
        }

    }
}
