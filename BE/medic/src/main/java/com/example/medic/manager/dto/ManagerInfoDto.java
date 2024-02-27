package com.example.medic.manager.dto;

import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import com.example.medic.medicalKnowledge.domain.WoundInfo;
import com.example.medic.qna.domain.Announcement;
import com.example.medic.qna.domain.Faq;
import com.example.medic.qna.domain.QnaAnswer;
import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.Id;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ManagerInfoDto {

    @Id
    @NotNull
    private String mId;

    @NotNull
    private String mPw;

    @NotNull
    private String mRole;

    @NotNull
    private String mName;

    @NotNull
    private String mgrPhone;

    @Builder
    public ManagerInfoDto(String mId, String mPw, String mRole, String mName, String mgrPhone) {
        this.mId = mId;
        this.mPw = mPw;
        this.mRole = mRole;
        this.mName = mName;
        this.mgrPhone = mgrPhone;
    }
}
