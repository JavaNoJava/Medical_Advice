package com.example.medic.manage.client;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.manager.dto.ManagedClientInfoDto;
import com.example.medic.manager.service.ClientManagementService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@SpringBootTest
@Transactional
class ManageByClientControllerTest {

    @Autowired
    AdviceRequestListRepository adviceRequestListRepository;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    ClientManagementService clientManagementService;

    @AfterEach
    void tearDown() {
        // 테스트가 종료될 때마다 실행되는 초기화 메서드
        adviceRequestListRepository.deleteAll();
        clientRepository.deleteAll();
    }


    @Test
    @DisplayName("일반 회원 목록 조회")
    @Transactional
    void findAllClient() {
        Client insertClient1 = clientRepository.save(Client.builder()
                .uId("admin44")
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

        Client insertClient2 = clientRepository.save(Client.builder()
                .uId("admin44")
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
                .client(insertClient1)
                .build());

        AdviceRequestList insertAdvice2 = adviceRequestListRepository.save(AdviceRequestList.builder()
                .adId(2L)
                .adPtName("a")
                .adPtSsNum("1")
                .adPtSub("1")
                .adPtDiagnosis("1")
                .adPtRec("1")
                .adPtCmt("1")
                .client(insertClient1)
                .build());


        int adviceCountByAdmin22 = 0;
        int adviceCountByAdmin33 = 0;


        List<ManagedClientInfoDto> allClient = clientManagementService.findAllClient();
        for (ManagedClientInfoDto managedClientInfoDto : allClient) {
            if (managedClientInfoDto.getUId().equals("admin44")) {
                adviceCountByAdmin22 = managedClientInfoDto.getCountByAdvice();
                System.out.println("managedClientInfoDto = " + managedClientInfoDto.getUId());
            } else {
                adviceCountByAdmin33 = managedClientInfoDto.getCountByAdvice();
            }
        }
        Assertions.assertThat(adviceCountByAdmin22).isEqualTo(2);
        Assertions.assertThat(adviceCountByAdmin33).isEqualTo(0);
        Assertions.assertThat(adviceCountByAdmin22).isNotEqualTo(5);
    }
}