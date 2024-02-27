package com.example.medic.advice.controller;

import com.example.medic.advice.dto.AdviceQuestionRequestDto;
import com.example.medic.advice.dto.AdviceUpdateDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.service.AdviceFileService;
import com.example.medic.advice.service.AdviceService;
import com.example.medic.client.dto.ClientInfoDto;

import com.example.medic.manager.controller.AdListAllController;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
public class AdviceController {

    private final AdviceService adviceService;
    private final AdviceFileService adviceFileService;

    private static final Logger logger = LoggerFactory.getLogger(AdviceController.class);

    //받는타입 지정
    @PostMapping(value = "/user/advice/request")
    public ResponseEntity<String> saveAdviceRequest(@RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
                                                    @RequestPart(name = "dto") AllAdviceRequestDto allAdviceRequestDto,
                                                    HttpServletRequest request) throws IOException {
        try{
            HttpSession session = request.getSession();
            String uid = (String) session.getAttribute("uId");

            ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                    .uId(uid)
                    .build();
            if (adviceService.saveAdviceRequest(allAdviceRequestDto, clientInfoDto, multipartFiles)) {
                return ResponseEntity.ok().body("saved");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
        }catch (SizeLimitExceededException e ){
            return ResponseEntity.ok().body("파일의 용량이 너무 큽니다.");
        }
    }

    /**
     * 자문의뢰 상세조회
     */
    @GetMapping("/user/advice/detail/{adId}")
    public ResponseEntity<AllAdviceRequestDto> findAdviceDetail(@PathVariable Long adId) {
        try {
            AllAdviceRequestDto allAdviceRequestDto = adviceService.getAdviceRequestDetail(adId);
            logger.info("adviceDetail:{}" ,allAdviceRequestDto);
            return ResponseEntity.ok(allAdviceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    /**
     * 자문의뢰 파일 조회
     */
    @GetMapping("/advice/findFile/{adId}/{filename}")
    public ResponseEntity<?> findAdviceRequestFile(@PathVariable Long adId, @PathVariable String filename) {
        try {
            Resource fileResource = adviceFileService.findAdviceRequestFile(adId, filename);
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
     * 자문의뢰 수정
     */
    @PutMapping("/user/advice/detail/update/{adId}")
    public ResponseEntity<String> updateAdviceRequestList(@PathVariable Long adId,
                                                          @RequestPart(name = "dto") AdviceUpdateDto adviceUpdateDto,
                                                          @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles) throws IOException {
        try{
            boolean updated = adviceService.updateAdviceRequest(adId, adviceUpdateDto, multipartFiles);

            if (updated) {
                return ResponseEntity.ok("자문의뢰 수정 성공");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Advice request with ID " + adId + " not found");
            }
        } catch (SizeLimitExceededException e){
            return ResponseEntity.ok("파일의 크기가 너무 큽니다.");
        }
    }

}

