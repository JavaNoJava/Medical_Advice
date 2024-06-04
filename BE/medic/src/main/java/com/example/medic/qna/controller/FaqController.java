package com.example.medic.qna.controller;

import com.example.medic.manager.controller.AdListAllController;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository;
import com.example.medic.qna.domain.Announcement;
import com.example.medic.qna.domain.Faq;
import com.example.medic.qna.dto.AnnouncementDto;
import com.example.medic.qna.dto.FaqSituationDto;
import com.example.medic.qna.repository.FaqRepository;
import com.example.medic.qna.service.FaqSituationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class FaqController {

    private final FaqSituationService faqSituationService;
    private static final Logger logger = LoggerFactory.getLogger(FaqController.class);


    /*
    faq 리스트 조회
     */
    @GetMapping("/faq/list")
    public ResponseEntity<List<Faq>> faqList(){
        try{
            List<Faq> faq = faqSituationService.faqSituationList();
            return ResponseEntity.ok(faq);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/faq/detail/{faqId}")
    public ResponseEntity<FaqSituationDto> detailFaq(@PathVariable Long faqId){
        if(faqId == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        FaqSituationDto faqSituationDto = faqSituationService.detailFaq(faqId);
        return ResponseEntity.ok(faqSituationDto);
    }
    /*
    faq 작성
     */
    @PostMapping("/faq/post/{mId}")
    public ResponseEntity<Integer> writeFaq(@PathVariable String mId, @RequestBody FaqSituationDto faqSituationDto){
        try{
            logger.info("mid:{}",mId);
            logger.info("faqdto:{}",faqSituationDto);
//            logger.info("faqSistatinon:{}",faqSituationService.writeFaq(mId, faqSituationDto));
            if(faqSituationService.writeFaq(mId, faqSituationDto)){
                return ResponseEntity.ok(1);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }

    /*
    faq 수정
     */
    @PutMapping("/faq/modify/{faqId}")
    public ResponseEntity<Integer> updateFaq(@PathVariable Long faqId, @RequestBody  FaqSituationDto faqSituationDto){
        try{
            logger.info("faqid:{}",faqId);
            logger.info("faqid2:{}",faqSituationDto);
            if(faqSituationService.updateFaq(faqId, faqSituationDto)){
                return ResponseEntity.ok(1);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }catch (Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }

    /*
    faq 삭제
     */

    @DeleteMapping("/faq/delete/{faqId}")
    public ResponseEntity<Integer> deleteFaq(@PathVariable Long faqId){
        try{
            if (faqSituationService.deleteFaq(faqId)){
                return ResponseEntity.ok(1);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }

    /**
     * 이전글
     */

    @GetMapping("/faq/detail/prev/{faqId}")
    public ResponseEntity<FaqSituationDto> findPrevFaqInfo(@PathVariable Long faqId)  {
                logger.info("prid:{}",faqId);
            FaqSituationDto prevFaqInfoDto = faqSituationService.findPrevFaqInfo(faqId);
            return ResponseEntity.ok(prevFaqInfoDto);
    }

    /**
     * 다음글
     */

    @GetMapping("/faq/detail/next/{faqId}")
    public ResponseEntity<FaqSituationDto> findNextFaqInfo(@PathVariable Long faqId)  {
        logger.info("neid:{}",faqId);
        FaqSituationDto prevFaqInfoDto = faqSituationService.findNextFaqInfo(faqId);
        return ResponseEntity.ok(prevFaqInfoDto);

    }

    @GetMapping("/faq/search/{keyword}")
    public ResponseEntity<List<Faq>> searchFaq(@PathVariable String keyword) {
        try {
            List<Faq> searchResults =faqSituationService.searchFaqInfo(keyword);
            return ResponseEntity.ok(searchResults);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

