package com.example.medic.qna.service;

import com.example.medic.client.service.ClientService;
import com.example.medic.manager.domain.Manager;
import com.example.medic.manager.repository.ManagerRepository;
import com.example.medic.qna.domain.Announcement;
import com.example.medic.qna.domain.Faq;
import com.example.medic.qna.dto.AnnouncementDto;
import com.example.medic.qna.dto.FaqSituationDto;
import com.example.medic.qna.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final ManagerRepository managerRepository;

    private final Logger logger = LoggerFactory.getLogger(ClientService.class);



    /**
     *
     * 게시글 조회
     */
    public List<Announcement> getAllAnnounce(){
            return announcementRepository.findAll();
    }

    public Announcement findDetailAnnounce(Long amId){
        Optional<Announcement> optionalAnnouncement = announcementRepository.findById(amId);

        if(optionalAnnouncement.isPresent()){
            Announcement announcement = optionalAnnouncement.get();
            return announcement;
        }else{
            return null;
        }
    }


    /**
     *
     * 게시글 작성
     */

    public Announcement saveAnnouncement(AnnouncementDto announcementDto) {
        String mid = announcementDto.getMId();
        Manager manager = managerRepository.findById(mid).get();


        Announcement announcement = Announcement.builder()

                .amName(announcementDto.getAmName())
                .amRegDate(announcementDto.getAmRegDate())
                .amContent(announcementDto.getAmContent())
                .manager(manager)
                .build();
        return announcementRepository.save(announcement);
    }


    /**
     *
     * 게시글 상세 조회
     */
    public AnnouncementDto announcdDetial(Long amId){
        Announcement announcement = announcementRepository.findById(amId).get();

        AnnouncementDto announcementDto = AnnouncementDto.builder()
                .amContent(announcement.getAmContent())
                .amName(announcement.getAmName())
                .amRegDate(announcement.getAmRegDate())
                .amMdDate(announcement.getAmMdDate())
                .mId(announcement.getManager().getMId())
                .build();
        return announcementDto;
    }


    /**
     *
     * 게시글 수정
     */

    public AnnouncementDto updateAnnouncement(Long amId, AnnouncementDto announcementDto){
        Announcement announcement = announcementRepository.findById(amId).get();
        logger.info("ammddate:{}",announcementDto.getAmMdDate());
//        Manager manager = managerRepository.findById(announcementDto.getMId()).get();
      announcement.updateAnnounce(announcementDto.getAmName(),announcementDto.getAmRegDate(),announcementDto.getAmContent(),announcementDto.getAmMdDate());

      announcementRepository.save(announcement);
        return  announcementDto;
    }

    /**
     *
     * 게시글 삭제
     */
    public Boolean deleteAnnouncement(Long amId){

        if(amId != null){
            announcementRepository.deleteById(amId);
            return  true;
        }
        return false;


    }

    /**
     * 이전글
     */
    public AnnouncementDto findPrevAnnouncementInfo(Long amId) {
        Announcement announcement = announcementRepository.findPrevAnnouncementInfo(amId);
        if(announcement != null){
            AnnouncementDto announcementDto = AnnouncementDto.builder()
                    .amName(announcement.getAmName())
                    .amContent(announcement.getAmContent())
                    .amRegDate(announcement.getAmRegDate())
                    .amId(announcement.getAmId())
                    .amMdDate(announcement.getAmMdDate())
                    .build();
            return announcementDto;
        }else return null;

    }

    /**
     * 다음글
     */
    public AnnouncementDto findNextAnnouncementInfo(Long amId) {
        Announcement announcement = announcementRepository.findNextAnnouncementInfo(amId);
        if(announcement != null){
            AnnouncementDto announcementDto = AnnouncementDto.builder()
                    .amName(announcement.getAmName())
                    .amRegDate(announcement.getAmRegDate())
                    .amContent(announcement.getAmContent())
                    .amId(announcement.getAmId())
                    .amMdDate(announcement.getAmMdDate())
                    .build();
            return announcementDto;
        }else return null;
         }

    /**
     *
     * @return 검색
     */
    public List<Announcement> searchAnnouncementInfo(String keyword) {
        return announcementRepository.findByAmNameContaining(keyword);
    }

}
