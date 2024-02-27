package com.example.medic.medicalKnowledge.controller;

import com.example.medic.manager.dto.ManagerInfoDto;
import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import com.example.medic.medicalKnowledge.dto.TrafficAccidentInfoDto;
import com.example.medic.medicalKnowledge.repository.TrafficAccidentInfoJpaRepository.PrevTrafficAccidentInfoDto;
import com.example.medic.medicalKnowledge.repository.TrafficAccidentInfoJpaRepository.NextTrafficAccidentInfoDto;
import com.example.medic.medicalKnowledge.service.TrafficAccidentInfoService;
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
public class TrafficAccidentInfoController {
    private final TrafficAccidentInfoService trafficAccidentInfoService;

    //전체 목록조회
    @GetMapping("/trafficAccident/list")
    public ResponseEntity<?> findTrafficAccidentInfoAll(){
        try{
            List<TrafficAccidentInfo> trafficAccidentInfoList = trafficAccidentInfoService.getAllTrafficAccidentInfo();
            return ResponseEntity.ok(trafficAccidentInfoList);
        }catch (Exception e){
            return new ResponseEntity<>("Error" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //상세 조회
    @GetMapping("/trafficAccident/detail/{taid}")
    public ResponseEntity<TrafficAccidentInfoDto> findTrafficAccidentInfoDetail(@PathVariable Long taid){
        try{
            TrafficAccidentInfoDto trafficAccidentInfoDto = trafficAccidentInfoService.getTrafficAccidentInfoDetail(taid);
            return ResponseEntity.ok(trafficAccidentInfoDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //이전 글 조회
    @GetMapping("/trafficAccident/detail/prev/{taid}")
    public ResponseEntity<PrevTrafficAccidentInfoDto> findPrevTrafficAccidentInfo(@PathVariable Long taid){
        try{
            PrevTrafficAccidentInfoDto prevTrafficAccidentInfoDto = trafficAccidentInfoService.findPrevTrafficAccidentInfo(taid);
            return ResponseEntity.ok(prevTrafficAccidentInfoDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //다음 글 조회
    @GetMapping("/trafficAccident/detail/next/{taid}")
    public ResponseEntity<NextTrafficAccidentInfoDto> findNextTrafficAccidentInfo(@PathVariable Long taid){
        try{
            NextTrafficAccidentInfoDto nextTrafficAccidentInfoDto = trafficAccidentInfoService.findNextTrafficAccidentInfo(taid);
            return ResponseEntity.ok(nextTrafficAccidentInfoDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //등록
    @PostMapping("/trafficAccident/post")
    public ResponseEntity<String> insertTrafficAccidentInfo(@RequestBody TrafficAccidentInfoDto trafficAccidentInfoDto,
                                                            HttpServletRequest request){
        try{
            HttpSession session = request.getSession();
            String mid = (String) session.getAttribute("uId");

            ManagerInfoDto writerInfoDto = ManagerInfoDto.builder()
                    .mId(mid)
                    .build();
            trafficAccidentInfoService.insertTrafficAccidentInfo(trafficAccidentInfoDto, writerInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //수정
    @PutMapping("/trafficAccident/modify/{taid}")
    public ResponseEntity<String> updateTrafficAccidentInfo(@PathVariable Long taid, @RequestBody TrafficAccidentInfoDto trafficAccidentInfoDto,
                                                            HttpServletRequest request){
        try{
            HttpSession session = request.getSession();
            String mid = (String) session.getAttribute("uId");

            ManagerInfoDto modifierInfoDto = ManagerInfoDto.builder()
                    .mId(mid)
                    .build();
            trafficAccidentInfoService.updateTrafficAccidentInfo(taid, trafficAccidentInfoDto, modifierInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //삭제
    @PostMapping("/trafficAccident/delete/{taid}")
    public ResponseEntity<String> deleteTrafficAccidentInfo(@PathVariable Long taid){
        try{
            trafficAccidentInfoService.deleteTrafficAccidentInfo(taid);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 검색 기능
     */
    @GetMapping("/trafficAccident/search")
    public ResponseEntity<List<TrafficAccidentInfo>> searchTrafficAccidentInfo(@RequestParam String keyword) {
        try {
            List<TrafficAccidentInfo> searchResults = trafficAccidentInfoService.searchTrafficAccidentInfo(keyword);
            return ResponseEntity.ok(searchResults);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
