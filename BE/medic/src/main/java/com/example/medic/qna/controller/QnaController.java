package com.example.medic.qna.controller;

import com.example.medic.qna.domain.Qna;
import com.example.medic.qna.dto.QnaDetailResponseDto;
import com.example.medic.qna.dto.QnaPasswordDto;
import com.example.medic.qna.dto.QnaRequestDto;
import com.example.medic.qna.dto.QnaResponseDto;
import com.example.medic.qna.repository.QnaRepository;
import com.example.medic.qna.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;

    //마이페이지 문의건수 조회
    @GetMapping("/myPage/myQna")
    public ResponseEntity<Integer> getCustomerInquiryCount(HttpServletRequest request){
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");

        if (currentUid == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            // AdviceRequestService를 통해 자문의뢰 건수 조회
            int qnaCount = qnaService.getQnaCount(currentUid);
            return ResponseEntity.ok(qnaCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //Qna 전체목록 조회
    @GetMapping("/qna/list")
    public ResponseEntity<List<QnaResponseDto>> findQPostAll(){
        try{
            List<QnaResponseDto> qnaList= qnaService.findQPostAll();
            return ResponseEntity.ok(qnaList);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Qna 상세조회
     */
    @GetMapping("/qna/detail/{qaId}")
    public ResponseEntity<QnaDetailResponseDto> findQPost(@PathVariable Long qaId){
        try{
            QnaDetailResponseDto qnaDetailResponseDto = qnaService.findQPost(qaId);
            return ResponseEntity.ok(qnaDetailResponseDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     *
     * Qna 비밀 게시글 비밀번호 검사
     */
    @PostMapping("/qna/checkPassword/{qaId}")
    public ResponseEntity<Boolean> checkpasswordQpost(@PathVariable Long qaId, @RequestBody QnaPasswordDto qnaPasswordDto){
        try{
            boolean checkpw = qnaService.checkpasswordQpost(qaId, qnaPasswordDto);
            return ResponseEntity.ok(checkpw);
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //Qna 게시글 작성
    @PostMapping("/qna/post")
    public ResponseEntity<String> writeQPost(HttpServletRequest request, @RequestBody QnaRequestDto qnaRequestDto){
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");

        try{
            qnaService.saveQPost(currentUid, qnaRequestDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //Qna 게시글 수정
    @PutMapping("/qna/modify/{qaid}")
    public ResponseEntity<String> updateQpost(HttpServletRequest request, @PathVariable Long qaid, @RequestBody QnaRequestDto qnaRequestDto){
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");
        try{
            qnaService.updateQPost(qaid ,currentUid, qnaRequestDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //Qna 게시글 삭제
    @DeleteMapping("/qna/delete/{qaid}")
    public ResponseEntity<String> deleteQpost(@PathVariable Long qaid){
        qnaService.deleteQpost(qaid);
        try{
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
