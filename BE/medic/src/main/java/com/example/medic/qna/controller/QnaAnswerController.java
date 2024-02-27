package com.example.medic.qna.controller;

import com.example.medic.qna.dto.QnaAnswerRequestDto;
import com.example.medic.qna.dto.QnaAnswerResponseDto;
import com.example.medic.qna.service.QnaAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class QnaAnswerController {
    private final QnaAnswerService qnaAnswerService;

    //문의 답변 조회
    @GetMapping("/qna/findAnswer/{qaId}")
    public ResponseEntity<QnaAnswerResponseDto> findQAnswer(@PathVariable Long qaId){
        try{
            QnaAnswerResponseDto qnaAnswerResponseDto = qnaAnswerService.findQAnswer(qaId);
            return ResponseEntity.ok(qnaAnswerResponseDto);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    //문의 답변 저장
    @PostMapping("/qna/writeAnswer/{qaId}")
    public ResponseEntity<String> saveQAnswer(HttpServletRequest request, @PathVariable Long qaId, @RequestBody QnaAnswerRequestDto qnaAnswerRequestDto){
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");
        try{
            qnaAnswerService.saveQAnswer(currentUid, qaId, qnaAnswerRequestDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //문의 답변 수정
    @PutMapping("/qna/modifyAnswer/{qaId}/{qaAsId}")
    public ResponseEntity<String> updateQAnswer(HttpServletRequest request, @PathVariable Long qaId, @PathVariable Long qaAsId, @RequestBody QnaAnswerRequestDto qnaAnswerRequestDto){
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");
        try{
            qnaAnswerService.updateQAnswer(currentUid, qaId, qaAsId, qnaAnswerRequestDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //문의 답변 삭제
    @DeleteMapping("/qna/deleteAnswer/{qaAsId}")
    public ResponseEntity<String> deleteQAnswer(@PathVariable Long qaAsId){
        qnaAnswerService.deleteQAnswer(qaAsId);
        try{
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
