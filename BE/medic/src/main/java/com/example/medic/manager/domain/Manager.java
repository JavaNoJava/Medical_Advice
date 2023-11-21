package com.example.medic.manager.domain;

import com.example.medic.advice.domain.DiagnosisRecord;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import com.example.medic.medicalKnowledge.domain.WoundInfo;
import com.example.medic.qna.domain.Announcement;
import com.example.medic.qna.domain.Faq;
import com.example.medic.qna.domain.Qna;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long mId;

    @NotNull
    private String mPw;

    @NotNull
    private String mName;

    @NotNull
    private String mgrPhone;

    @OneToMany(mappedBy = "manager")
    private List<Qna> qnas = new ArrayList<>();

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
