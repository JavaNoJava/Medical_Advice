package com.example.medic.consultative.service;

import com.example.medic.advice.domain.*;
import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.repository.*;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.analyze.repository.AnalyzeAssignmentRepository;
import com.example.medic.analyze.repository.AnalyzeRequestFileRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestRepository;
import com.example.medic.analyze.service.AnalyzeServiceImpl;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.files.handler.FileHandler;
import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.*;
import com.example.medic.translation.repository.TranslationAnswerFileRepository;
import com.example.medic.translation.repository.TranslationAssignmentRepository;
import com.example.medic.translation.repository.TranslationRequestFileRepository;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.PersistenceException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ConsultativeAssignmentServiceImpl implements ConsultativeAssignmentService{

    private final Logger logger = LoggerFactory.getLogger(ConsultativeAssignmentServiceImpl.class);
    private final ConsultativeRepository consultativeRepository;
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AdviceQuestionRepository adviceQuestionRepository;
    private final AdviceFileRepository adviceFileRepository;
    private final DiagnosisRecordRepository diagnosisRecordRepository;
    private final AnalyzeAssignmentRepository analyzeAssignmentRepository;
    private final AnalyzeRequestFileRepository analyzeRequestFileRepository;
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final AnalyzeRequestRepository analyzeRequestRepository;
    private final TranslationAssignmentRepository translationAssignmentRepository;
    private final TranslationRequestListRepository translationRequestListRepository;
    private final TranslationRequestFileRepository translationRequestFileRepository;
    private final TranslationAnswerFileRepository translationAnswerFileRepository;
    private final FileHandler fileHandler;
    /**
     * @return 배정 받은 자문 의뢰 목록 조회
     */
    @Override
    public List<AdviceSituationDto> findAllAssigmentAdvice(ConsultativeDto consultativeDto) throws NoSuchElementException{
        try {
            if (consultativeDto.getCId() == null) {     // 전문의 ID null 여부 체크
                throw new NoSuchElementException("해당 전문의를 찾을 수 없습니다.");
            }
            List<AdviceSituationDto> findAllAdviceSituationDto = new ArrayList<>();     // 배정 자문 의뢰 목록 리스트 선언
            Consultative findConsultative = consultativeRepository.findById(consultativeDto.getCId()).get();        // 전문의 키 값을 통해 전문의 찾기
            List<AdviceAssignment> findAllAdviceAssignment = adviceAssignmentRepository.findAllAdviceAssignmentByConsultative(findConsultative);    // 해당 전문의가 배정된 배정 목록 꺼내기
            for (AdviceAssignment adviceAssignment : findAllAdviceAssignment) {     // 배정 목록을 순회하며
                AdviceRequestList adviceRequestList = adviceAssignment.getAdviceRequestList();      // 각 자문 의뢰에 접근해
                AdviceSituationDto adviceSituationDto = AdviceSituationDto.builder()        // 배정 목록 Dto에 맞게 변환
                        .adId(adviceRequestList.getAdId())
                        .adPtSub(adviceRequestList.getAdPtSub())
                        .adPtDiagnosis(adviceRequestList.getAdPtDiagnosis())
                        .adRegDate(adviceRequestList.getAdRegDate())
                        .admDate(adviceAssignment.getAdmDate())
                        .build();
                findAllAdviceSituationDto.add(adviceSituationDto);
            }
            return findAllAdviceSituationDto;
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 배정 받은 특정 자문 의뢰 상세 조회
     */
    @Override
    public AllAdviceRequestDto findAssigmentAdviceDetail(ConsultativeDto consultativeDto,
                                                         Long adId) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException();
            }
            AdviceRequestList findAdviceRequestList = adviceRequestListRepository.findById(adId).get();
            Client requestClient = findAdviceRequestList.getClient();
            List<AdviceQuestion> findAdviceQuestion = adviceQuestionRepository.findAllByAdviceRequestList(findAdviceRequestList);
            AdviceFile findAdviceFile = adviceFileRepository.findByAdviceRequestList(findAdviceRequestList);
            DiagnosisRecord findDiagnosisRecord = diagnosisRecordRepository.findByAdviceRequestList(findAdviceRequestList);

            return createResponseAllAdviceDto(findAdviceRequestList, requestClient, findAdviceQuestion,
                    findAdviceFile, findDiagnosisRecord);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 신청된 의료 자문 정보 dto 생성
     */
    public AllAdviceRequestDto createResponseAllAdviceDto (AdviceRequestList findAdviceRequestList, Client requestClient,
                                                           List<AdviceQuestion> findAdviceQuestionList, AdviceFile findAdviceFile,
                                                           DiagnosisRecord findDiagnosisRecord) {
        List<String> questionContent = new ArrayList<>();
        List<String> answerContent = new ArrayList<>();
        for (AdviceQuestion adviceQuestion : findAdviceQuestionList) {
            questionContent.add(adviceQuestion.getAdQuestionContent());
//            if (adviceQuestion.getAdAnswerContent() != null) {
//                answerContent.add(adviceQuestion.getAdAnswerContent());
//            }
            answerContent.add(adviceQuestion.getAdAnswerContent());
        }

        return AllAdviceRequestDto.builder()
                .uName(requestClient.getUName())
                .userTel(requestClient.getUserTel())
                .userPhone(requestClient.getUserPhone())
                .userAddress(requestClient.getUserAddress())
                .adPtName(findAdviceRequestList.getAdPtName())
                .adPtSsNum(findAdviceRequestList.getAdPtSsNum())
                .adPtSub(findAdviceRequestList.getAdPtSub())
                .adPtDiagnosis(findAdviceRequestList.getAdPtDiagnosis())
                .adPtRec(findAdviceRequestList.getAdPtRec())
                .adPtCmt(findAdviceRequestList.getAdPtCmt())
                .insurance(findAdviceRequestList.getInsurance())
                .insureDate(findAdviceRequestList.getInsureDate())
                .insureName(findAdviceRequestList.getInsureName())
                .hospital(findDiagnosisRecord.getHospital())
                .admStart(findDiagnosisRecord.getAdmStart())
                .admEnd(findDiagnosisRecord.getAdmEnd())
                .visitStart(findDiagnosisRecord.getVisitStart())
                .visitEnd(findDiagnosisRecord.getVisitEnd())
                .treatCmt(findDiagnosisRecord.getTreatCmt())
                .diagRound(findDiagnosisRecord.getDiagRound())
                .adEtc(findAdviceRequestList.getAdEtc())
                .adQuestionContent(questionContent)
                .adAnswerContent(answerContent)
                .adReqForm(findAdviceFile.getAdReqForm())
                .adDiagnosis(findAdviceFile.getAdDiagnosis())
                .adRecord(findAdviceFile.getAdRecord())
                .adFilm(findAdviceFile.getAdFilm())
                .adOther(findAdviceFile.getAdOther())
                .build();
    }

    /**
     * @return 배정 받은 분석 의뢰 목록 조회
     */
    @Override
    public List<AnalyzeSituationDto> findAllAssigmentAnalyze(ConsultativeDto consultativeDto) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {     // 전문의 ID null 여부 체크
                throw new NoSuchElementException("해당 전문의를 찾을 수 없습니다.");
            }
            List<AnalyzeSituationDto> findAllAnalyzeSituationDto = new ArrayList<>();     // 배정 분석 의뢰 목록 리스트 선언
            Consultative findConsultative = consultativeRepository.findById(consultativeDto.getCId()).get();        // 배정된 목록을 불러올 전문의 찾기
            List<AnalyzeAssignment> findAllAnalyzeRequestList = analyzeAssignmentRepository.findAllAnalyzeAssignmentByConsultative(findConsultative);    // 해당 전문의가 배정된 분석 목록 꺼내기
            for (AnalyzeAssignment analyzeAssignment : findAllAnalyzeRequestList) {     // 배정 목록을 순회하며
                AnalyzeRequestList findAnalyzeRequest = analyzeAssignment.getAnalyzeRequestList();      // 각 분석 의뢰에 접근해
                AnalyzeSituationDto analyzeSituationDto = AnalyzeSituationDto.builder()        // 배정 목록 Dto에 맞게 변환
                        .anId(findAnalyzeRequest.getAnId())
                        .anPtSub(findAnalyzeRequest.getAnPtSub())
                        .anPtDiagnosis(findAnalyzeRequest.getAnPtDiagnosis())
                        .anRegDate(findAnalyzeRequest.getAnRegDate())
                        .anMdDate(analyzeAssignment.getAdMdDate())
                        .build();
                findAllAnalyzeSituationDto.add(analyzeSituationDto);
            }

            return findAllAnalyzeSituationDto;
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }


    /**
     * @return 배정 받은 특정 분석 의뢰 상세 조회
     */
    @Override
    public AnalyzeResponseDto findAssignmentAnalyzeDetail(ConsultativeDto consultativeDto,
                                                         Long anId) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException();
            }
            AnalyzeRequestList findAnalyzeRequestList = analyzeRequestListRepository.findById(anId).get();
            Client requestClient = findAnalyzeRequestList.getClient();
            List<AnalyzeRequest> findAnalyzeQuestion = analyzeRequestRepository.findAllByAnalyzeRequestList(findAnalyzeRequestList);
            AnalyzeRequestFile findAnalyzeFile = analyzeRequestFileRepository.findByAnalyzeRequestList(findAnalyzeRequestList);

            return createResponseAnalyzeDto(findAnalyzeRequestList, requestClient, findAnalyzeQuestion, findAnalyzeFile);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 신청된 의료 분석 정보 응답 dto 생성
     */
    private AnalyzeResponseDto createResponseAnalyzeDto(AnalyzeRequestList findAnalyzeRequestList, Client requestClient,
                                                        List<AnalyzeRequest> findAnalyzeQuestion, AnalyzeRequestFile findAnalyzeFile) {
        List<String> questionContent = new ArrayList<>();
        List<String> answerContent = new ArrayList<>();
        for (AnalyzeRequest analyzeRequest : findAnalyzeQuestion) {
            questionContent.add(analyzeRequest.getAnQuestionContent());
//            if (analyzeRequest.getAnAnswerContent() != null) {
//                answerContent.add(analyzeRequest.getAnAnswerContent());
//            }
            answerContent.add(analyzeRequest.getAnAnswerContent());
        }

        return AnalyzeResponseDto.builder()
                .uName(requestClient.getUName())
                .userTel(requestClient.getUserTel())
                .userPhone(requestClient.getUserPhone())
                .userAddress(requestClient.getUserAddress())
                .anPtName(findAnalyzeRequestList.getAnPtName())
                .anPtSsNum(findAnalyzeRequestList.getAnPtSsNum())
                .anPtSub(findAnalyzeRequestList.getAnPtSub())
                .anPtDiagnosis(findAnalyzeRequestList.getAnPtDiagnosis())
                .anPtDiagContent(findAnalyzeRequestList.getAnPtDiagContent())
                .anEtc(findAnalyzeRequestList.getAnEtc())
                .anQuestionContent(questionContent)
                .anAnswerContent(answerContent)
                .anReqForm(findAnalyzeFile.getAnReqForm())
                .anDiagnosis(findAnalyzeFile.getAnDiagnosis())
                .anRecord(findAnalyzeFile.getAnRecord())
                .anFilm(findAnalyzeFile.getAnFilm())
                .anOther(findAnalyzeFile.getAnOther())
                .build();
    }

    /**
     * @return 배정 받은 번역 의뢰 목록 조회
     */
    @Override
    public List<TranslationSituationDto> findAllAssigmentTranslation(ConsultativeDto consultativeDto) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException("해당 전문의를 찾을 수 없습니다.");
            }
            List<TranslationSituationDto> findAllTranslationSituationDto = new ArrayList<>();
            Consultative findConsultative = consultativeRepository.findById(consultativeDto.getCId()).get();
            List<TranslationAssignment> findAllTranslationAssignment =
                    translationAssignmentRepository.findAllTranslationAssignmentByConsultative(findConsultative);
            for (TranslationAssignment translationAssignment : findAllTranslationAssignment) {
                TranslationRequestList translationRequestList = translationAssignment.getTranslationRequestList();
                TranslationSituationDto translationRequestDto = TranslationSituationDto.builder()
                        .trPtSub(translationRequestList.getTrPtSub())
                        .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                        .trRegDate(translationRequestList.getTrRegDate())
                        .trId(translationRequestList.getTrId())
                        .tamDate(translationAssignment.getTamDate())
                        .build();
                findAllTranslationSituationDto.add(translationRequestDto);
            }
            return findAllTranslationSituationDto;
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 배정 받은 특정 번역 의뢰 상세 조회
     */
    @Override
    public TranslationResponseDto findAssignmentTranslationDetail(ConsultativeDto consultativeDto,
                                                                  Long trId) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException();
            }
            TranslationRequestList findTranslationRequestList =
                    translationRequestListRepository.findById(trId).get();
            Client requestClient = findTranslationRequestList.getClient();
            TranslationRequestFile findTranslationRequestFile =
                    translationRequestFileRepository.findByTranslationRequestList(findTranslationRequestList);
            TranslationAnswerFile findTranslationAnswerFile =
                    translationAnswerFileRepository.findByTranslationRequestList(findTranslationRequestList);

            return createTranslationResponseDto(findTranslationRequestList, requestClient, findTranslationRequestFile, findTranslationAnswerFile);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 신청된 의료 번역 정보 응답 dto 생성
     */
    private TranslationResponseDto createTranslationResponseDto(TranslationRequestList findTranslationRequestList, Client requestClient,
                                                                TranslationRequestFile findTranslationRequestFile,
                                                                TranslationAnswerFile findTranslationAnswerFile) {
        return TranslationResponseDto.builder()
                .uName(requestClient.getUName())
                .userTel(requestClient.getUserTel())
                .userPhone(requestClient.getUserPhone())
                .userAddress(requestClient.getUserAddress())
                .trPtName(findTranslationRequestList.getTrPtName())
                .trPtSsNum(findTranslationRequestList.getTrPtSsNum())
                .trPtSub(findTranslationRequestList.getTrPtSub())
                .trPtDiagnosis(findTranslationRequestList.getTrPtDiagnosis())
                .trPtDiagContent(findTranslationRequestList.getTrPtDiagContent())
                .trEtc(findTranslationRequestList.getTrEtc())
                .trMtl(findTranslationRequestFile.getTrMtl())
                .trAnswer(findTranslationAnswerFile.getTrAnswer())
                .build();
    }

    /**
     * 번역의뢰 답변파일 저장
     */
    @Override
    public boolean saveTranslationAnswerFile(ConsultativeDto consultativeDto, List<MultipartFile> multipartFiles, Long trId) throws IOException {
        Consultative consultative = consultativeRepository.findById(consultativeDto.getCId()).get();
        TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).get();
        TranslationAnswerFileRequestDto translationAnswerFileRequestDto = splitTranslationAnswerFile(consultativeDto, multipartFiles);

        try{
            TranslationAnswerFile translationAnswerFile = TranslationAnswerFile.builder()
                    .trAnswer(translationAnswerFileRequestDto.getTrAnswer())
                    .translationRequestList(translationRequestList)
                    .consultative(consultative)
                    .build();
            translationAnswerFileRepository.save(translationAnswerFile);
            return true;
        } catch (PersistenceException p){
            logger.info("분석 의뢰 신청 저장 실패");
            return false;
        }
    }

    /**
     * 번역의뢰 답변 파일 dto 변환
     */
    private TranslationAnswerFileRequestDto splitTranslationAnswerFile(ConsultativeDto consultativeDto, List<MultipartFile> multipartFiles) throws IOException {
        try{
            if(multipartFiles.size() !=0) {
                Path projectPath;
                if (System.getProperty("user.dir").contains("medic")) {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/file/translationanswer/");
                } else {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/translationanswer/");
                }
                Deque <String> files = fileHandler.parseFile(projectPath, multipartFiles);
                return TranslationAnswerFileRequestDto.builder()
                        .trAnswer(consultativeDto.getTrAnswer())
                        .build();
            }
        } catch (NullPointerException e){
            return TranslationAnswerFileRequestDto.builder()
                    .trAnswer(consultativeDto.getTrAnswer())
                    .build();
        }
        return null;
    }

    /**
     * 배정받은 자문의뢰 갯수 조회
     */
    public int getAssignmentAdviceCount(String cId) throws NoSuchElementException {
        try {
            List<AdviceAssignment> findAllAdviceRequestList = adviceAssignmentRepository.findByConsultative_CId(cId);
            return findAllAdviceRequestList.size();
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * 배정받은 분석의뢰 갯수 조회
     */
    public int getAssignmentAnalyzeCount(String cId) throws NoSuchElementException {
        try {
            List<AnalyzeAssignment> findAllAnalyzeRequestList = analyzeAssignmentRepository.findByConsultative_CId(cId);
            return findAllAnalyzeRequestList.size();
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * 배정받은 번역의뢰 갯수 조회
     */
    public int getAssignmentTranslationCount(String cId) throws NoSuchElementException {
        try {
            List<TranslationAssignment> findAllTranslationRequestList = translationAssignmentRepository.findByConsultative_CId(cId);
            return findAllTranslationRequestList.size();
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }
}
