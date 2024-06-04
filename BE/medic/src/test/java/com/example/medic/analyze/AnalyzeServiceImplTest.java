package com.example.medic.analyze;

import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.repository.AnalyzeRequestFileRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestRepository;
import com.example.medic.analyze.service.AnalyzeServiceImpl;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.repository.ClientRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class AnalyzeServiceImplTest {

    @Autowired
    AnalyzeServiceImpl analyzeService;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    AnalyzeRequestListRepository analyzeRequestListRepository;
    @Autowired
    AnalyzeRequestRepository analyzeRequestRepository;
    @Autowired
    AnalyzeRequestFileRepository analyzeRequestFileRepository;

    @BeforeEach
    @DisplayName("일반 회원 등록")
    @Transactional
    void insertClient() {
        Client insertClient1 = clientRepository.save(Client.builder()
                .uId("test1")
                .uPw("1234")
                .uName("2")
                .cpTel("3")
                .uRole("4")
                .uEmail("5")
                .ceo("6")
                .userPhone("7")
                .userTel("8")
                .cpNum("9")
                .company("10")
                .cpAddress("11")
                .cpFx("12")
                .userAddress("13")
                .build());

        Client insertClient2 = clientRepository.save(Client.builder()
                .uId("test2")
                .uPw("1234")
                .uName("1")
                .cpTel("1")
                .uRole("1")
                .uEmail("1")
                .ceo("1")
                .userPhone("1")
                .userTel("1")
                .cpNum("1")
                .company("1")
                .cpAddress("1")
                .cpFx("1")
                .userAddress("1")
                .build());
    }


//    @Test
//    @DisplayName("분석 의뢰 저장 테스트")
//    @Transactional
//    void saveAnalyze() {
//        //given
//        ClientInfoDto testClient1 = ClientInfoDto.builder()
//                .uId("test1")
//                .build();
//
//        Map<String, String> questionTest = new HashMap<>();
//        questionTest.put("1", "첫번째 테스트입니다.");
//        questionTest.put("2", "두번째 테스트입니다.");
//        AnalyzeRequestDto analyzeRequestDto = AnalyzeRequestDto.builder()
//                .anPtName("환자")
//                .anPtSsNum("11111111111111")
//                .anPtSub("정형외과")
//                .anPtDiagnosis("아파요")
//                .anEtc("없어요")
//                .anReqForm("테스트 신청서")
//                .questions(questionTest)
//                .build();
//
//        //when
//        analyzeService.saveAnalyzeRequest(analyzeRequestDto, testClient1);
//        AnalyzeRequestList findAnalyzeList = analyzeRequestListRepository.findByAnPtName("환자");
//        List<AnalyzeRequest> findAllAnalyzeQuestion = analyzeRequestRepository.findAllByAnalyzeRequestList(findAnalyzeList);
//        AnalyzeRequest analyzeQuestion1 = findAllAnalyzeQuestion.get(0);
//        AnalyzeRequest analyzeQuestion2 = findAllAnalyzeQuestion.get(1);
//        AnalyzeRequestFile findAnalyzeFile = analyzeRequestFileRepository.findByAnalyzeRequestList(findAnalyzeList);
//
//
//        //then
//        assertThat(findAnalyzeList.getAnId()).isEqualTo(1L);
//        assertThat(findAnalyzeList.getAnPtSsNum().length()).isEqualTo(14);
//        assertThat(findAnalyzeList.getAnRegDate()).isEqualTo("2024-01-12");
//        assertThat(analyzeQuestion1.getAnQuestionNum()).isEqualTo(1);
//        assertThat(analyzeQuestion1.getAnQuestionContent()).isEqualTo("첫번째 테스트입니다.");
//        assertThat(analyzeQuestion2.getAnQuestionNum()).isEqualTo(2);
//        assertThat(analyzeQuestion2.getAnQuestionContent()).isEqualTo("두번째 테스트입니다.");
//        assertThat(findAnalyzeFile.getAnReqForm()).isEqualTo("테스트 신청서");
//
//
//    }
}
