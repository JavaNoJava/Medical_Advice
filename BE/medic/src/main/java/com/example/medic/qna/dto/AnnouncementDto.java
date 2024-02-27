package com.example.medic.qna.dto;

import com.example.medic.qna.domain.Announcement;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Data


public class AnnouncementDto {
    private String amName;
    private LocalDate amRegDate;
    private String amContent;
    private LocalDate amMdDate;
    private Long amId;


    private String mId;

    @Builder
    public  AnnouncementDto(String amName, LocalDate amRegDate, String amContent, String mId, LocalDate amMdDate,Long amId) {

               this.amContent = amContent;
               this.amRegDate = amRegDate;
               this.amName = amName;
               this.mId = mId;
               this.amMdDate = amMdDate;
               this.amId = amId;

    }


}
