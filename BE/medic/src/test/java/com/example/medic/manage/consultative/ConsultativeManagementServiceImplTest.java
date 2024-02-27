package com.example.medic.manage.consultative;

import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.manager.dto.ManagedClientInfoDto;
import com.example.medic.manager.dto.ManagedConsultativeInfoDto;
import com.example.medic.manager.service.ConsultativeManagementServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class ConsultativeManagementServiceImplTest {

    @Autowired
    ConsultativeManagementServiceImpl consultativeManagementServiceImpl;
    @Autowired
    ConsultativeRepository consultativeRepository;

    @BeforeEach
    @DisplayName("전문의 등록")
    @Transactional
    void insertConsultative() {
        Consultative insertConsultative1 = consultativeRepository.save(Consultative.builder()
                .cId("test1")
                .cPw("1")
                .cRole("전문의")
                .cName("abcd")
                .cAddress("ad")
                .cEmail("test@test.com")
                .cPhone("111")
                .cTel("111")
                .hospAddress("111")
                .department("11")
                .hospFx("11")
                .hospName("11")
                .hospNum("11")
                .hospTel("11")
                .build());

        Consultative insertConsultative2 = consultativeRepository.save(Consultative.builder()
                .cId("test2")
                .cPw("2")
                .cRole("전문의2")
                .cName("abcd2")
                .cAddress("ad2")
                .cEmail("test2@test.com")
                .cPhone("1112")
                .cTel("1112")
                .hospAddress("1112")
                .department("112")
                .hospFx("112")
                .hospName("112")
                .hospNum("112")
                .hospTel("112")
                .build());
    }

    @Test
    @DisplayName("전문의 목록 확인")
    @Transactional
    void findAllConsultative() {
        List<ManagedConsultativeInfoDto> allConsultative = consultativeManagementServiceImpl.findAllConsultative();
        for (ManagedConsultativeInfoDto managedConsultativeInfoDto : allConsultative) {
            Consultative findConsultative = consultativeRepository.findById(managedConsultativeInfoDto.getCId()).get();
            if (findConsultative.getCId().equals("test1")) {
                assertThat(findConsultative.getCEmail()).isEqualTo("test@test.com");
                assertThat(managedConsultativeInfoDto.getCountByAdviceAssignment()).isEqualTo(0);
                assertThat(managedConsultativeInfoDto.getCountByAdviceAssignment()).isNotEqualTo(3);
            } else {
                assertThat(findConsultative.getCEmail()).isEqualTo("test2@test.com");
                assertThat(findConsultative.getCEmail()).isNotEqualTo("test@test.com");
            }
        }
    }

    @Test
    @DisplayName("전문의 상세 정보 확인")
    void findDetailConsultativeInfo() {
        //given
        // insertConsultative()

        //when
        ManagedConsultativeInfoDto managedConsultativeInfoDto = consultativeManagementServiceImpl.viewDoctorManagementDetails("test1");

        //then
        assertThat(managedConsultativeInfoDto.getCId()).isEqualTo("test1");
        assertThat(managedConsultativeInfoDto.getCEmail()).isEqualTo("test@test.com");
        assertThat(managedConsultativeInfoDto.getCRole()).isEqualTo("전문의");
        assertThat(managedConsultativeInfoDto.getHospTel()).isNotEqualTo("112");

    }

    @Test
    @DisplayName("특정 전문의 정보 수정")
    @Transactional
    void updateConsultative() {
        //given
        // insertConsultative()
        ManagedConsultativeInfoDto updateConsultative = ManagedConsultativeInfoDto.builder()
                .cId("test1")
                .cPw("1")
                .cRole("한의원")
                .cName("권영태")
                .cAddress("ad")
                .cEmail("update@test.com")
                .cPhone("111")
                .cTel("111")
                .hospAddress("111")
                .department("11")
                .hospFx("11")
                .hospName("11")
                .hospNum("11")
                .hospTel("11")
                .build();

        //when
        consultativeManagementServiceImpl.updateDoctorManagement(updateConsultative);
        Consultative featureConsultative = consultativeRepository.findById("test1").get();

        //then
        assertThat(featureConsultative.getCRole()).isEqualTo("한의원");
        assertThat(featureConsultative.getCName()).isEqualTo("권영태");
        assertThat(featureConsultative.getCEmail()).isEqualTo("update@test.com");
        assertThat(featureConsultative.getCPw()).isEqualTo("1");
        assertThat(featureConsultative.getCAddress()).isNotEqualTo("abcd");
    }

    @Test
    @DisplayName("특정 전문의 삭제")
    @Transactional
    void deleteConsultative() {
        //given
        //insertConsultative();
        ManagedConsultativeInfoDto deleteConsultative = ManagedConsultativeInfoDto.builder()
                .cId("test1")
                .build();

        //when
        consultativeManagementServiceImpl.deleteDoctorManagement(deleteConsultative);
        List<ManagedConsultativeInfoDto> allConsultative = consultativeManagementServiceImpl.findAllConsultative();
        Consultative findConsultative = new Consultative();
        for (ManagedConsultativeInfoDto managedConsultativeInfoDto : allConsultative) {
            findConsultative = consultativeRepository.findById(managedConsultativeInfoDto.getCId()).get();
        }
        //then
        assertThat(allConsultative.size()).isEqualTo(1);
        assertThat(findConsultative.getCId()).isEqualTo("test2");
        assertThat(findConsultative.getCId()).isNotEqualTo("test1");

    }


}
