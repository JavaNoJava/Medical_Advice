package com.example.medic.manage.client;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.client.repository.ClientRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
public class CountByAdviceTest {

    @Autowired
    AdviceRequestListRepository adviceRequestListRepository;
    @Autowired
    ClientRepository clientRepository;


    @Test
    @DisplayName("회원가입")
    @Transactional
    void register() {
        Client insertClient = clientRepository.save(Client.builder()
                .uId("admin22")
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

        Client findClient = clientRepository.findByUId("admin22").get();

        Assertions.assertThat(findClient).isSameAs(insertClient);
    }

    @Test
    @DisplayName("자문의뢰 등록")
    @Transactional
    void insertAdvice() {
        Client insertClient = clientRepository.save(Client.builder()
                .uId("admin22")
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

        AdviceRequestList insertAdvice = adviceRequestListRepository.save(AdviceRequestList.builder()
                .adId(1L)
                .adPtName("a")
                .adPtSsNum("1")
                .adPtSub("1")
                .adPtDiagnosis("1")
                .adPtRec("1")
                .adPtCmt("1")
                .client(insertClient)
                .build());

        AdviceRequestList findAdviceRequest = adviceRequestListRepository.findById(1L).get();

        Assertions.assertThat(findAdviceRequest).isSameAs(insertAdvice);
    }

    @Test
    @DisplayName("자문의뢰 신청 개수 확인")
    @Transactional
    void countByAdvice() {
        Client insertClient = clientRepository.save(Client.builder()
                .uId("admin22")
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

        AdviceRequestList insertAdvice1 = adviceRequestListRepository.save(AdviceRequestList.builder()
                .adId(1L)
                .adPtName("a")
                .adPtSsNum("1")
                .adPtSub("1")
                .adPtDiagnosis("1")
                .adPtRec("1")
                .adPtCmt("1")
                .client(insertClient)
                .build());

        AdviceRequestList insertAdvice2 = adviceRequestListRepository.save(AdviceRequestList.builder()
                .adId(2L)
                .adPtName("a")
                .adPtSsNum("1")
                .adPtSub("1")
                .adPtDiagnosis("1")
                .adPtRec("1")
                .adPtCmt("1")
                .client(insertClient)
                .build());

        AdviceRequestList insertAdvice3 = adviceRequestListRepository.save(AdviceRequestList.builder()
                .adId(3L)
                .adPtName("a")
                .adPtSsNum("1")
                .adPtSub("1")
                .adPtDiagnosis("1")
                .adPtRec("1")
                .adPtCmt("1")
                .client(insertClient)
                .build());

        AdviceRequestList insertAdvice4 = adviceRequestListRepository.save(AdviceRequestList.builder()
                .adId(4L)
                .adPtName("a")
                .adPtSsNum("1")
                .adPtSub("1")
                .adPtDiagnosis("1")
                .adPtRec("1")
                .adPtCmt("1")
                .client(insertClient)
                .build());

        int count = adviceRequestListRepository.countAllByClient(insertClient);

        Assertions.assertThat(count).isNotEqualTo(3);
    }

}
