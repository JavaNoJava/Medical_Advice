package com.example.medic.advice.dto;

import com.example.medic.advice.domain.AdviceQuestion;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class AllAdviceRequestDto {

    /* 자문의뢰내역 */
    private Long adId;

    private String adPtName;

    private String adPtSsNum;

    private String adPtSub;

    private String adPtDiagnosis;

    private String adPtRec;

    private String adPtCmt;

    private String insurance;

    private String insureDate;

    private String insureName;

    private String adEtc;

    private LocalDate adRegDate;

    private LocalDate adMdDate;

    /*자문내역 질문지*/
    private List<String> adQuestionContent;

    private List<String> adAnswerContent;

    private LocalDate adAnswerDate;

    /*자문 파일*/
    private String adReqForm;

    private String adDiagnosis;

    private String adRecord;

    private String adFilm;

    private String adOther;

    /*진료기록*/
    private String hospital;

    private String admStart;

    private String admEnd;

    private String visitStart;

    private String visitEnd;

    private String treatCmt;

    private int diagRound;

    /*신청자 정보*/
    private String uName;

    private String userTel;

    private String userPhone;

    private String userAddress;

    private List<AdviceQuestion> adviceQuestions;

    private List<AdviceQuestion> adviceAnswers;

    /*자문배정일*/
    private LocalDate admDate;

    private String admProgressStatus;

    @Builder
    public AllAdviceRequestDto(Long adId, String adPtName, String adPtSsNum, String adPtSub, String adPtDiagnosis,
                               String adPtRec, String adPtCmt, String insurance, String insureDate,
                               String insureName, String adEtc, LocalDate adRegDate, LocalDate adMdDate,
                               List<String> adQuestionContent, List<String> adAnswerContent, LocalDate adAnswerDate,
                               String adReqForm, String adDiagnosis, String adRecord, String adFilm,
                               String adOther, String hospital, String admStart, String admEnd,
                               String visitStart, String visitEnd, String treatCmt, int diagRound,
                               String uName, String userTel, String userPhone, String userAddress,
                               List<AdviceQuestion> adviceQuestions, List<AdviceQuestion> adviceAnswers,
                               LocalDate admDate, String admProgressStatus){
        this.adId = adId;
        this.adPtName = adPtName;
        this.adPtSsNum = adPtSsNum;
        this.adPtSub = adPtSub;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adPtRec = adPtRec;
        this.adPtCmt = adPtCmt;
        this.insurance = insurance;
        this.insureDate = insureDate;
        this.insureName = insureName;
        this.adEtc = adEtc;
        this.adRegDate =adRegDate;
        this.adMdDate = adMdDate;
        this.adQuestionContent = adQuestionContent;
        this.adAnswerContent = adAnswerContent;
        this.adAnswerDate = adAnswerDate;
        this.adReqForm = adReqForm;
        this.adDiagnosis = adDiagnosis;
        this.adRecord = adRecord;
        this.adFilm = adFilm;
        this.adOther = adOther;
        this.hospital = hospital;
        this.admStart = admStart;
        this.admEnd = admEnd;
        this.visitStart = visitStart;
        this.visitEnd = visitEnd;
        this.treatCmt = treatCmt;
        this.diagRound = diagRound;
        this.uName = uName;
        this.userTel = userTel;
        this.userPhone = userPhone;
        this.userAddress = userAddress;
        this.adviceQuestions = adviceQuestions;
        this.adviceAnswers = adviceAnswers;
        this.admDate = admDate;
        this.admProgressStatus = admProgressStatus;
    }
}
