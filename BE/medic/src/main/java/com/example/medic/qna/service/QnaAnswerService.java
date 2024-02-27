package com.example.medic.qna.service;

import com.example.medic.client.repository.ClientRepository;
import com.example.medic.manager.domain.Manager;
import com.example.medic.manager.repository.ManagerRepository;
import com.example.medic.qna.domain.Qna;
import com.example.medic.qna.domain.QnaAnswer;
import com.example.medic.qna.dto.QnaAnswerRequestDto;
import com.example.medic.qna.dto.QnaAnswerResponseDto;
import com.example.medic.qna.dto.QnaRequestDto;
import com.example.medic.qna.dto.QnaResponseDto;
import com.example.medic.qna.repository.QnaAnswerRepository;
import com.example.medic.qna.repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class QnaAnswerService {
    private final QnaAnswerRepository qnaAnswerRepository;
    private final ManagerRepository managerRepository;
    private final QnaRepository qnaRepository;

    //문의 답변 조회
    public QnaAnswerResponseDto findQAnswer(Long qaid){
        QnaAnswer qnaAnswer = qnaAnswerRepository.findAnswerByQaId(qaid).orElse(null);
        if(qnaAnswer == null){
            return null;
        }
        String mId = qnaAnswerRepository.findMIdByQaId(qaid).get();

        QnaAnswerResponseDto qnaAnswerResponseDto = QnaAnswerResponseDto.builder()
                .qaAnswerId(qnaAnswer.getQaAnswerId())
                .qaAnswer(qnaAnswer.getQaAnswer())
                .qaAnswerDate(qnaAnswer.getQaAnswerDate())
                .mId(mId)
                .build();
        return qnaAnswerResponseDto;
    }

    //문의 답변 저장
    public QnaAnswer saveQAnswer(String currentMid, Long qaId, QnaAnswerRequestDto qnaAnswerRequestDto){
        Manager manager = managerRepository.findById(currentMid)
                .orElseThrow(() -> new NoSuchElementException("해당 Manager를 찾을 수 없습니다."));
        Qna qna = qnaRepository.findById(qaId).get();

        QnaAnswer qnaAnswer = QnaAnswer.builder()
                .qaAnswerDate(qnaAnswerRequestDto.getQaAnswerDate())
                .qaAnswer(qnaAnswerRequestDto.getQaAnswer())
                .qna(qna)
                .manager(manager)
                .build();
        return qnaAnswerRepository.save(qnaAnswer);
    }
    //문의 답변 수정
    public QnaAnswer updateQAnswer(String currentMid, Long qaId, Long qaAsId, QnaAnswerRequestDto qnaAnswerRequestDto){
        Manager manager = managerRepository.findById(currentMid).get();
        Qna qna = qnaRepository.findById(qaId).get();

        QnaAnswer qnaAnswer = qnaAnswerRepository.findById(qaAsId).get();
        if(qnaAnswer == null){
            throw new IllegalArgumentException("등록된 답변이 없습니다.");
        }
        QnaAnswer updateQnaAnswer = qnaAnswer.builder()
                .qaAnswerId(qaAsId)
                .qaAnswerDate(qnaAnswerRequestDto.getQaAnswerDate())
                .qaAnswer(qnaAnswerRequestDto.getQaAnswer())
                .qna(qna)
                .manager(manager)
                .build();

        return qnaAnswerRepository.save(updateQnaAnswer);
    }
    //문의 답변 삭제
    public String deleteQAnswer(Long qaAsId){
        qnaAnswerRepository.deleteById(qaAsId);
        return "삭제되었습니다.";
    }
}
