package com.example.medic.medicalKnowledge.controller;

import com.example.medic.manager.dto.ManagerInfoDto;
import com.example.medic.medicalKnowledge.domain.WoundInfo;
import com.example.medic.medicalKnowledge.dto.WoundInfoDto;
import com.example.medic.medicalKnowledge.service.WoundInfoService;
import com.example.medic.medicalKnowledge.repository.WoundInfoRepository.PrevWoundInfoDto;
import com.example.medic.medicalKnowledge.repository.WoundInfoRepository.NextWoundInfoDto;
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
public class WoundInfoController {
    private final WoundInfoService woundInfoService;

    //전체 목록조회
    @GetMapping("/woundInfo/list")
    public ResponseEntity<?> findWoundInfoAll(){
        try{
            List<WoundInfo> woundInfoList = woundInfoService.getAllWoundInfo();
            return ResponseEntity.ok(woundInfoList);
        }catch (Exception e){
            return new ResponseEntity<>("Error" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //상세 조회
    @GetMapping("/woundInfo/detail/{woid}")
    public ResponseEntity<WoundInfoDto> findWoundInfoDetail(@PathVariable Long woid){
        try{
            WoundInfoDto woundInfoDto = woundInfoService.getWoundInfoDetail(woid);
            return ResponseEntity.ok(woundInfoDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //이전 글 조회
    @GetMapping("/woundInfo/detail/prev/{woid}")
    public ResponseEntity<PrevWoundInfoDto> findPrevWoundInfo(@PathVariable Long woid){
        try{
            PrevWoundInfoDto prevWoundInfo = woundInfoService.findPrevWoundInfo(woid);
            return ResponseEntity.ok(prevWoundInfo);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //다음 글 조회
    @GetMapping("/woundInfo/detail/next/{woid}")
    public ResponseEntity<NextWoundInfoDto> findNextWoundInfo(@PathVariable Long woid){
        try{
            NextWoundInfoDto nextWoundInfo = woundInfoService.findNextWoundInfo(woid);
            return ResponseEntity.ok(nextWoundInfo);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //등록
    @PostMapping("/woundInfo/post")
    public ResponseEntity<String> insertWoundInfo(@RequestBody WoundInfoDto woundInfoDto, HttpServletRequest request){
        try{
            HttpSession session = request.getSession();
            String mid = (String) session.getAttribute("uId");

            ManagerInfoDto writerInfoDto = ManagerInfoDto.builder()
                    .mId(mid)
                    .build();
            woundInfoService.insertWoundInfo(woundInfoDto, writerInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //수정
    @PutMapping("/woundInfo/modify/{woid}")
    public ResponseEntity<String> updateWoundInfo(@PathVariable Long woid, @RequestBody WoundInfoDto woundInfoDto,
                                                  HttpServletRequest request){
        try{
            HttpSession session = request.getSession();
            String mid = (String) session.getAttribute("uId");

            ManagerInfoDto modifierInfoDto = ManagerInfoDto.builder()
                    .mId(mid)
                    .build();
            woundInfoService.updateWoundInfo(woid, woundInfoDto, modifierInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //삭제
    @PostMapping("/woundInfo/delete/{woid}")
    public ResponseEntity<String> deleteWoundInfo(@PathVariable Long woid){
        try{
            woundInfoService.deleteWoundInfo(woid);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 검색 기능
     */
    @GetMapping("/woundInfo/search")
    public ResponseEntity<List<WoundInfo>> searchWoundInfo(@RequestParam String keyword) {
        try {
            List<WoundInfo> searchResults = woundInfoService.searchWoundInfo(keyword);
            return ResponseEntity.ok(searchResults);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
