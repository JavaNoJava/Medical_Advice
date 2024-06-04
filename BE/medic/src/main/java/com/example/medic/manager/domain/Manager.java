package com.example.medic.manager.domain;

import com.example.medic.advice.domain.DiagnosisRecord;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import com.example.medic.medicalKnowledge.domain.WoundInfo;
import com.example.medic.qna.domain.Announcement;
import com.example.medic.qna.domain.Faq;
import com.example.medic.qna.domain.Qna;
import com.example.medic.qna.domain.QnaAnswer;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Manager {
    @Id
    @NotNull
    @Column(length = 12)
    private String mId;

    @NotNull
    @Column(length = 15)
    private String mPw;

    @NotNull
    @Column(length = 15)
    private String mRole;

    @NotNull
    @Column(length = 20)
    private String mName;

    @NotNull
    @Column(length = 13)
    private String mgrPhone;

    @OneToMany(mappedBy = "manager")
    private List<QnaAnswer> qnaAnswer;

    @OneToMany(mappedBy = "manager")
    private List<Faq> faqs = new ArrayList<>();

    @OneToMany(mappedBy = "manager")
    private List<Announcement> announcements = new ArrayList<>();

    @OneToMany(mappedBy = "manager")
    private List<IndustrialAccidentInfo> industrialAccidentInfos = new ArrayList<>();

    @OneToMany(mappedBy = "manager")
    private List<MedicalNegligenceInfo> medicalNegligenceInfos = new ArrayList<>();

    @OneToMany(mappedBy = "manager")
    private List<TrafficAccidentInfo> trafficAccidentInfos = new ArrayList<>();

    @OneToMany(mappedBy = "manager")
    private List<WoundInfo> woundInfos = new ArrayList<>();
}
