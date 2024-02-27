package com.example.medic.manager.service;

import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.qna.repository.AnnouncementRepository;
import com.example.medic.qna.repository.FaqRepository;
import com.example.medic.qna.repository.QnaRepository;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final ClientRepository clientRepository;
    private final ConsultativeRepository consultativeRepository;
    private final QnaRepository qnaRepository;
    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final TranslationRequestListRepository translationRequestListRepository;
    private final FaqRepository faqRepository;
    private final AnnouncementRepository announcementRepository;

    public Long getUserCount(){
        long userCount = clientRepository.count();
        return userCount;
    }

    public Long getConsultativeCount(){
        long consultativeCount = consultativeRepository.count();
        return consultativeCount;
    }
    public Long getQnaCount(){
        long qnaCount = qnaRepository.count();
        return qnaCount;
    }

    public Long getAdviceCount(){
        long adviceCount = adviceRequestListRepository.count();
        return adviceCount;
    }
    public Long getAnalyzeCount(){
        long analyzeCount = analyzeRequestListRepository.count();
        return analyzeCount;
    }
    public Long getTranslateCount(){
        long translateCount = translationRequestListRepository.count();
        return translateCount;
    }

    public Long getFaqCount(){
        long faqCount = faqRepository.count();
        return faqCount;
    }

    public Long getAnnounceCount(){
        long announceCount = announcementRepository.count();
        return announceCount;
    }

}
