package com.example.medic.manage.client;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.manager.dto.ManagedClientInfoDto;
import com.example.medic.manager.service.ClientManagementService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class ClientManagementServiceTest {

    @Autowired
    ClientManagementService clientManagementService;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    AdviceRequestListRepository  adviceRequestListRepository;

    @BeforeEach
    @DisplayName("일반 회원 등록")
    @Transactional
    void insertClient() {
        Client insertClient = clientRepository.save(Client.builder()
                .uId("admin44")
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
    }

    @Test
    @DisplayName("일반 회원 목록 조회")
    @Transactional
    void findAllClient() {
        //given
        Client findClient = clientRepository.findByUId("admin44").get();

        AdviceRequestList insertAdvice1 = adviceRequestListRepository.save(AdviceRequestList.builder()
                .adId(1L)
                .adPtName("a")
                .adPtSsNum("1")
                .adPtSub("1")
                .adPtDiagnosis("1")
                .adPtRec("1")
                .adPtCmt("1")
                .client(findClient)
                .build());

        AdviceRequestList insertAdvice2 = adviceRequestListRepository.save(AdviceRequestList.builder()
                .adId(2L)
                .adPtName("a")
                .adPtSsNum("1")
                .adPtSub("1")
                .adPtDiagnosis("1")
                .adPtRec("1")
                .adPtCmt("1")
                .client(findClient)
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

    @Test
    @DisplayName("일반 회원 정보 조회")
    @Transactional
    void viewClientDetails() {
        //given
        Client insertClient = clientRepository.save(Client.builder()
                .uId("admin44")
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

        //when
        ManagedClientInfoDto findClient = clientManagementService.findDetailByClient("admin44");

        //then
        assertThat(findClient.getUId()).isEqualTo(insertClient.getUId());
        assertThat(findClient.getUPw()).isEqualTo(insertClient.getUPw());
        assertThat(findClient.getUName()).isEqualTo(insertClient.getUName());
        assertThat(findClient.getURole()).isEqualTo(insertClient.getURole());
        assertThat(findClient.getUEmail()).isEqualTo(insertClient.getUEmail());
        assertThat(findClient.getUserPhone()).isEqualTo(insertClient.getUserPhone());
        assertThat(findClient.getUserTel()).isEqualTo(insertClient.getUserTel());
        assertThat(findClient.getUserAddress()).isEqualTo(insertClient.getUserAddress());
        assertThat(findClient.getCeo()).isEqualTo(insertClient.getCeo());
        assertThat(findClient.getCpNum()).isEqualTo(insertClient.getCpNum());
        assertThat(findClient.getCompany()).isEqualTo(insertClient.getCompany());
        assertThat(findClient.getCpFx()).isEqualTo(insertClient.getCpFx());
    }

    @Test
    @DisplayName("일반 회원 정보 수정")
    @Transactional
    void updateClient() {
        //given
        Client insertClient = clientRepository.save(Client.builder()
                .uId("admin44")
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

        Client currentClient = clientRepository.findByUId("admin44").get();

        ManagedClientInfoDto updateClient = ManagedClientInfoDto.builder()
                .uId("admin44")
                .uPw("1234567")
                .uName("2")
                .cpTel("3")
                .uRole("4")
                .uEmail("test@test.com")
                .ceo("6")
                .userPhone("7")
                .userTel("8")
                .cpNum("9")
                .company("10")
                .cpAddress("11")
                .cpFx("12")
                .userAddress("13")
                .build();

        //when
        clientManagementService.updateClient(updateClient);
        Client findClient = clientRepository.findByUId("admin44").get();

        //then
        assertThat(findClient.getUPw()).isEqualTo("1234567");
        assertThat(findClient.getUEmail()).isEqualTo("test@test.com");
        assertThat(findClient).isSameAs(currentClient);
    }

    @Test
    @DisplayName("관리자 일반 회원 삭제")
    void deleteClient() {
        //given
        ManagedClientInfoDto managedClientInfoDto = ManagedClientInfoDto.builder()
                .uId("admin44")
                .build();

        String uId = "admin44";

        //when
        clientManagementService.deleteClient(uId);
        Optional<Client> findClient = clientRepository.findByUId("admin44");

        //then
        assertThat(findClient).isEmpty();
    }
}
