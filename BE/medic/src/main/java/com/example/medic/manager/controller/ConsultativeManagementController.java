package com.example.medic.manager.controller;

import com.example.medic.manager.dto.ManagedClientInfoDto;
import com.example.medic.manager.dto.ManagedConsultativeInfoDto;
import com.example.medic.manager.service.ConsultativeManagementServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@Controller
@RequiredArgsConstructor
public class ConsultativeManagementController {

    private final ConsultativeManagementServiceImpl consultativeManagementService;

    /**
     * @return 전문의 목록 조회
     */
    @GetMapping("/admin/manageConsultative/list")
    public ResponseEntity<List<ManagedConsultativeInfoDto>> findAllConsultative() {
        List<ManagedConsultativeInfoDto> response = consultativeManagementService.findAllConsultative();
        if (response == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * @return 관지라 특정 전문의 상세 조회
     */
    @GetMapping("/admin/manageConsultative/detail/{cId}")
    public ResponseEntity<ManagedConsultativeInfoDto> findDetailByConsultative(@PathVariable String cId) {

        if (cId == null || cId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        ManagedConsultativeInfoDto responseConsultativeInfoDto = consultativeManagementService.viewDoctorManagementDetails(cId);
        return ResponseEntity.ok(responseConsultativeInfoDto);
    }

    /**
     * @return 관리자 특정 전문의 정보 수정
     */
    @PostMapping("/admin/manageConsultative/modify")
    public ResponseEntity<String> updateConsultativeInfo(@RequestBody ManagedConsultativeInfoDto managedConsultativeInfoDto) {
        if (!consultativeManagementService.updateDoctorManagement(managedConsultativeInfoDto)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok("전문의 정보 수정 완료");
    }

    /**
     * @return 관리자 특정 전문의 정보 삭제
     */
    @PostMapping("/admin/manageConsultative/delete/{cId}")
    public ResponseEntity<String> deleteConsultativeInfO(@RequestBody ManagedConsultativeInfoDto managedConsultativeInfoDto) {
        if (!consultativeManagementService.deleteDoctorManagement(managedConsultativeInfoDto)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok("전문의 정보 삭제 완료");
    }
}
