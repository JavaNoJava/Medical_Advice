package com.example.medic.qna.service;

import com.example.medic.manager.controller.AdListAllController;
import com.example.medic.manager.domain.Manager;
import com.example.medic.manager.repository.ManagerRepository;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository;
import com.example.medic.qna.domain.Faq;
import com.example.medic.qna.dto.AnnouncementDto;
import com.example.medic.qna.dto.FaqSituationDto;
import com.example.medic.qna.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FaqSituationService {
    private final FaqRepository faqRepository;
    private final ManagerRepository managerRepository;
    private static final Logger logger = LoggerFactory.getLogger(FaqSituationService.class);



    public List<Faq> faqSituationList(){
        List<Faq> faq = faqRepository.findAll();
        return faq;
    }

    public FaqSituationDto detailFaq(Long faqId){
        Faq faq = faqRepository.findById(faqId).get();
        FaqSituationDto faqSituationDto = FaqSituationDto.builder()
                .faqQuestion(faq.getFaqQuestion())
                .faqId(faqId)
                .faqAnswer(faq.getFaqAnswer())
                .faqRegDate(faq.getFaqRegDate())
                .faqMdDate(faq.getFaqMdDate())
                .mId(faq.getManager().getMId())
                .build();
        return faqSituationDto;
    }

    @Transactional
    public Boolean writeFaq(String mId , FaqSituationDto faqSituationDto) {
        try {
            Manager manager = managerRepository.findById(mId).get();

            if(manager.getMRole().equals("manager")){
                Faq faq = Faq.builder()
                        .faqAnswer(faqSituationDto.getFaqAnswer())
                        .faqQuestion(faqSituationDto.getFaqQuestion())
                        .faqMdDate(faqSituationDto.getFaqMdDate())
                        .faqRegDate(faqSituationDto.getFaqRegDate())
                        .manager(manager)
                        .build();
                faqRepository.save(faq);
                return true;
            }
            return  false;

        } catch (Exception e) {
            return false;
        }

    }
        public Boolean updateFaq(Long faqId, FaqSituationDto faqSituationDto){
        try{
            logger.info("faqdtd:{}", faqSituationDto.getFaqQuestion());
                Faq faq = faqRepository.findById(faqId).get();
                faq.updateFaq(faqSituationDto.getFaqMdDate(), faqSituationDto.getFaqQuestion(), faqSituationDto.getFaqAnswer(),faqSituationDto.getFaqRegDate());
                    faqRepository.save(faq);
                return true;


        }catch (Exception e){
            return false;
        }

        }

        public Boolean deleteFaq(Long faqId){
        try{
            faqRepository.deleteById(faqId);
            return true;
        }catch (Exception e){
            return false;
        }
        }

    /**
     * 이전글
     */
    public FaqSituationDto findPrevFaqInfo(Long faqId) {
        Faq prevFaqInfoDto = faqRepository.findPrevFaqInfo(faqId);
        if (prevFaqInfoDto != null) {
            FaqSituationDto faqSituationDto = FaqSituationDto.builder()
                    .faqRegDate(prevFaqInfoDto.getFaqRegDate())
                    .faqQuestion(prevFaqInfoDto.getFaqQuestion())
                    .faqAnswer(prevFaqInfoDto.getFaqAnswer())
                    .faqMdDate(prevFaqInfoDto.getFaqMdDate())
                    .faqId(prevFaqInfoDto.getFaqId())
                    .build();
            return faqSituationDto;
        } else {
            return null;
        }
    }

    /**
     * 다음글
     */
    public FaqSituationDto findNextFaqInfo(Long faqId) {
        Faq nextFaqInfoDto = faqRepository.findNextFaqInfo(faqId);
        if (nextFaqInfoDto != null) {
            FaqSituationDto faqSituationDto = FaqSituationDto.builder()
                    .faqRegDate(nextFaqInfoDto.getFaqRegDate())
                    .faqQuestion(nextFaqInfoDto.getFaqQuestion())
                    .faqAnswer(nextFaqInfoDto.getFaqAnswer())
                    .faqMdDate(nextFaqInfoDto.getFaqMdDate())
                    .faqId(nextFaqInfoDto.getFaqId())
                    .build();
            return faqSituationDto;
        } else {
            return null;
        }
    }

    /**
     *
     * @return 검색
     */
    public List<Faq> searchFaqInfo(String keyword) {
        return faqRepository.findByFaqQuestionContaining(keyword);
    }


}
