package com.example.medic.medicalKnowledge.controller;

import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.manager.dto.ManagerInfoDto;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.dto.IndustrialAccidentInfoDto;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository.PrevIndustrialAccidentInfoDto;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository.NextIndustrialAccidentInfoDto;
import com.example.medic.medicalKnowledge.service.IndustrialAccidentInfoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@AllArgsConstructor
public class IndustrialAccidentInfoController {
    private final IndustrialAccidentInfoService industrialAccidentInfoService;

    //전체 목록조회
    @GetMapping("/industrialAccident/list")
    public ResponseEntity<?> findIndustrialAccidentInfoAll(){
        try{
            List<IndustrialAccidentInfo> industrialAccidentInfoList = industrialAccidentInfoService.getAllIndustrialAccidentInfo();
            return ResponseEntity.ok(industrialAccidentInfoList);
        }catch (Exception e){
            return new ResponseEntity<>("Error" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //상세 조회
    @GetMapping("/industrialAccident/detail/{iaid}")
    public ResponseEntity<IndustrialAccidentInfoDto> findIndustrialAccidentInfoDetail(@PathVariable Long iaid){
        try{
            IndustrialAccidentInfoDto industrialAccidentInfoDto = industrialAccidentInfoService.getIndustrialAccidentInfoDetail(iaid);
            return ResponseEntity.ok(industrialAccidentInfoDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //이전 글 조회
    @GetMapping("/industrialAccident/detail/prev/{iaid}")
    public ResponseEntity<PrevIndustrialAccidentInfoDto> findPrevIndustrialAccidentInfo(@PathVariable Long iaid){
        try{
            PrevIndustrialAccidentInfoDto prevIndustrialAccidentInfoDto = industrialAccidentInfoService.findPrevIndustrialAccidentInfo(iaid);
            return ResponseEntity.ok(prevIndustrialAccidentInfoDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //다음 글 조회
    @GetMapping("/industrialAccident/detail/next/{iaid}")
    public ResponseEntity<NextIndustrialAccidentInfoDto> findNextIndustrialAccidentInfo(@PathVariable Long iaid){
        try{
            NextIndustrialAccidentInfoDto nextIndustrialAccidentInfo = industrialAccidentInfoService.findNextIndustrialAccidentInfo(iaid);
            return ResponseEntity.ok(nextIndustrialAccidentInfo);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //등록
    @PostMapping("/industrialAccident/post")
    public ResponseEntity<String> insertIndustrialAccidentInfo(@RequestBody IndustrialAccidentInfoDto industrialAccidentInfoDto, HttpServletRequest request){
        try{
            HttpSession session = request.getSession();
            String mid = (String) session.getAttribute("uId");

            ManagerInfoDto writerInfoDto = ManagerInfoDto.builder()
                    .mId(mid)
                    .build();
            industrialAccidentInfoService.insertIndustrialAccidentInfo(industrialAccidentInfoDto, writerInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //수정
    @PutMapping("/industrialAccident/modify/{iaid}")
    public ResponseEntity<String> updateIndustrialAccidentInfo(@PathVariable Long iaid, @RequestBody IndustrialAccidentInfoDto industrialAccidentInfoDto,
                                                               HttpServletRequest request){
        try{
            HttpSession session = request.getSession();
            String mid = (String) session.getAttribute("uId");

            ManagerInfoDto modifierInfoDto = ManagerInfoDto.builder()
                    .mId(mid)
                    .build();
            industrialAccidentInfoService.updateIndustrialAccidentInfo(iaid, industrialAccidentInfoDto, modifierInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //삭제
    @PostMapping("/industrialAccident/delete/{iaid}")
    public ResponseEntity<String> deleteIndustrialAccidentInfo(@PathVariable Long iaid){
        try{
            industrialAccidentInfoService.deleteIndustrialAccidentInfo(iaid);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 검색 기능
     */
    @GetMapping("/industrialAccident/search")
    public ResponseEntity<List<IndustrialAccidentInfo>> searchIndustrialAccidentInfo(@RequestParam String keyword) {
        try {
            List<IndustrialAccidentInfo> searchResults = industrialAccidentInfoService.searchIndustrialAccidentInfo(keyword);
            return ResponseEntity.ok(searchResults);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
