package com.example.medic.qna.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.qna.domain.Qna;
import com.example.medic.qna.dto.QnaDetailResponseDto;
import com.example.medic.qna.dto.QnaPasswordDto;
import com.example.medic.qna.dto.QnaRequestDto;
import com.example.medic.qna.dto.QnaResponseDto;
import com.example.medic.qna.repository.QnaAnswerRepository;
import com.example.medic.qna.repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QnaService {
    private final QnaRepository qnaRepository;
    private final ClientRepository clientRepository;
    private final QnaAnswerRepository qnaAnswerRepository;

    //문의건수 조회
    public int getQnaCount(String uid) {
        try {
            return qnaRepository.findByClient_UId(uid);
        } catch (Exception e) {
            throw new RuntimeException("문의 건수 조회 중 오류 발생");
        }
    }

    //문의 게시글 목록 불러오기
    public List<QnaResponseDto> findQPostAll() {
        try{
            List<Qna> qnaList = qnaRepository.findAll();
            List<QnaResponseDto> AllQnaList = new ArrayList<>();
            for(Qna q : qnaList){
                QnaResponseDto qnaResponseDto = convertToDto(q);
                AllQnaList.add(qnaResponseDto);
            }
            return AllQnaList;
        } catch (Exception e){
            throw new RuntimeException("문의 리스트 조회 중 오류 발생");
        }
    }

    //문의 게시글 상세조회
    public QnaDetailResponseDto findQPost(Long qaId) {
        Qna qna = qnaRepository.findById(qaId).get();
        String uId = qnaRepository.findUserIdByQaId(qaId).get();

        QnaDetailResponseDto qnaDetailResponseDto = QnaDetailResponseDto.builder()
                .qaId(qna.getQaId())
                .qaDate(qna.getQaDate())
                .qaTitle(qna.getQaTitle())
                .qaSecret(qna.isQaSecret())
                .qaPw(qna.getQaPw())
                .qaQuestion(qna.getQaQuestion())
                .uId(uId)
                .build();

        return qnaDetailResponseDto;
    }

    //문의 게시글 저장
    public Qna saveQPost(String currentUid, QnaRequestDto qnaRequestDto) {
        Client client = clientRepository.findByUId(currentUid).orElse(null);
        Qna qna = Qna.builder()
                .qaDate(LocalDate.now())
                .qaTitle(qnaRequestDto.getQaTitle())
                .qaSecret(qnaRequestDto.isQaSecret())
                .qaPw(qnaRequestDto.getQaPw())
                .qaQuestion(qnaRequestDto.getQaQuestion())
                .client(client)
                .build();

        return qnaRepository.save(qna);
    }

    //문의 게시글 수정
    public Qna updateQPost(Long qaid, String currentUid, QnaRequestDto qnaRequestDto){
        Qna qna = qnaRepository.findById(qaid).get();
        Client client = clientRepository.findByUId(currentUid).orElse(null);
        if(qna == null){
            throw new IllegalArgumentException("등록된 게시물이 없습니다.");
        }
        Qna updateQna = qna.builder()
                .qaId(qna.getQaId())
                .qaDate(LocalDate.now())
                .qaTitle(qnaRequestDto.getQaTitle())
                .qaSecret(qnaRequestDto.isQaSecret())
                .qaPw(qnaRequestDto.getQaPw())
                .qaQuestion(qnaRequestDto.getQaQuestion())
                .client(client)
                .build();
        return qnaRepository.save(updateQna);
    }

    /**
     *
     * 문의 게시글 삭제
     */

    public String deleteQpost(Long qaid){
        Long qaAnswerId = qnaAnswerRepository.findAnswerIdByQaId(qaid).orElse(null);
        if(qaAnswerId == null){
            qnaRepository.deleteById(qaid);
            return "삭제되었습니다.";
        }
        qnaAnswerRepository.deleteById(qaAnswerId);
        qnaRepository.deleteById(qaid);
        return "삭제되었습니다.";
    }

    /**
     *
     * 문의 게시글 비밀번호 유효성검사
     */
    public boolean checkpasswordQpost(Long qaId, QnaPasswordDto qnaPasswordDto){
        try{
            String qaPw = qnaPasswordDto.getQaPw();
            String checkPw = qnaRepository.findCheckPw(qaId).get();
            if(checkPw.equals(qaPw)){
                return true;
            }else {
                return false;
            }
        } catch (Exception e) {
            throw new RuntimeException("문의 게시글 비밀번호 검사 중 오류 발생");
        }
    }
    /**
     * Qna리스트 Dto 변환
     */
    private QnaResponseDto convertToDto(Qna qna) {
        if (qna != null) {
            return QnaResponseDto.builder()
                    .qaId(qna.getQaId())
                    .qaDate(qna.getQaDate())
                    .qaTitle(qna.getQaTitle())
                    .qaSecret(qna.isQaSecret())
                    .uId(qna.getClient().getUId())
                    .build();
        }
        return null;
    }
}
