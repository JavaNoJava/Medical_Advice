package com.example.medic.translation;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.repository.TranslationRequestFileRepository;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import com.example.medic.translation.service.TranslationServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class TranslationServiceImplTest {

    @Autowired
    TranslationServiceImpl translationService;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    TranslationRequestFileRepository translationRequestFileRepository;
    @Autowired
    TranslationRequestListRepository translationRequestListRepository;

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

    @Test
    @DisplayName("번역 의뢰 등록")
    @Transactional
    void saveTranslation() {
        //given
        ClientInfoDto testClient1 = ClientInfoDto.builder()
                .uId("test1")
                .build();
        TranslationRequestDto translationRequestDto = TranslationRequestDto.builder()
                .trPtName("테스트환자")
                .trPtSsNum("11111111111111")
                .trPtDiagnosis("테스트과")
                .trPtDiagContent("테스트질병")
                .trEtc("없음")
                .trMtl("테스트파일")
                .build();

        //when
        translationService.saveTranslationRequest(translationRequestDto, testClient1);
        TranslationRequestList findTranslationList = translationRequestListRepository.findByTrPtName("테스트환자");
        TranslationRequestFile findTranslationFile = translationRequestFileRepository.findByTranslationRequestList(findTranslationList);


        //then
        assertThat(findTranslationList.getClient().getUId()).isEqualTo("test1");
        assertThat(findTranslationList.getClient().getUId()).isNotEqualTo("test2");
        assertThat(findTranslationList.getTrPtDiagnosis()).isEqualTo("테스트과");
        assertThat(findTranslationFile.getTfId()).isEqualTo(1L);
        assertThat(findTranslationFile.getTrMtl()).isEqualTo("테스트파일");
    }
}
