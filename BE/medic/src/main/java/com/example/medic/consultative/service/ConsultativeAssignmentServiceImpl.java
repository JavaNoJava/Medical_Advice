package com.example.medic.consultative.service;

import com.example.medic.advice.domain.*;
import com.example.medic.advice.dto.AdviceQuestionRequestDto;
import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.repository.*;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.*;
import com.example.medic.analyze.repository.AnalyzeAssignmentRepository;
import com.example.medic.analyze.repository.AnalyzeRequestFileRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestRepository;
import com.example.medic.analyze.service.AnalyzeServiceImpl;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.dto.ConsultativeInfoDto;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.PersistenceException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsultativeAssignmentServiceImpl implements ConsultativeAssignmentService{

    private final Logger logger = LoggerFactory.getLogger(ConsultativeAssignmentServiceImpl.class);
    private final ConsultativeService consultativeService;
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
                boolean isNullAnswer = adviceQuestionRepository.existsByAdAnswerDateNullAndAdviceRequestList(adviceRequestList);
                if (isNullAnswer) {
                    AdviceSituationDto adviceSituationDto = AdviceSituationDto.builder()        // 배정 목록 Dto에 맞게 변환
                            .adId(adviceRequestList.getAdId())
                            .adPtSub(adviceRequestList.getAdPtSub())
                            .adPtDiagnosis(adviceRequestList.getAdPtDiagnosis())
                            .adRegDate(adviceRequestList.getAdRegDate())
                            .admDate(adviceAssignment.getAdmDate())
                            .admProgressStatus(adviceAssignment.getAdmProgressStatus())
                            .adAnswerDate(null)
                            .build();
                    findAllAdviceSituationDto.add(adviceSituationDto);
                } else {
                    LocalDate latestAnswerDate = adviceQuestionRepository.findLatestAdAnswerDateByAdviceRequestList(adviceRequestList);
                    AdviceSituationDto adviceSituationDto = AdviceSituationDto.builder()        // 배정 목록 Dto에 맞게 변환
                            .adId(adviceRequestList.getAdId())
                            .adPtSub(adviceRequestList.getAdPtSub())
                            .adPtDiagnosis(adviceRequestList.getAdPtDiagnosis())
                            .adRegDate(adviceRequestList.getAdRegDate())
                            .admDate(adviceAssignment.getAdmDate())
                            .admProgressStatus(adviceAssignment.getAdmProgressStatus())
                            .adAnswerDate(latestAnswerDate)
                            .build();
                    findAllAdviceSituationDto.add(adviceSituationDto);
                }
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
            AdviceAssignment findAdviceAssignment = adviceAssignmentRepository.findByAdviceRequestList(findAdviceRequestList);

            return createResponseAllAdviceDto(findAdviceRequestList, requestClient, findAdviceQuestion,
                    findAdviceFile, findDiagnosisRecord, findAdviceAssignment);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 신청된 의료 자문 정보 dto 생성
     */
    public AllAdviceRequestDto createResponseAllAdviceDto (AdviceRequestList findAdviceRequestList, Client requestClient,
                                                           List<AdviceQuestion> findAdviceQuestionList, AdviceFile findAdviceFile,
                                                           DiagnosisRecord findDiagnosisRecord, AdviceAssignment findAdviceAssignment) {
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
                .admProgressStatus(findAdviceAssignment.getAdmProgressStatus())
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
                boolean isNullAnswer = analyzeRequestRepository.existsByAnAnswerDateNullAndAnalyzeRequestList(findAnalyzeRequest);
                if (isNullAnswer) {
                    AnalyzeSituationDto analyzeSituationDto = AnalyzeSituationDto.builder()        // 배정 목록 Dto에 맞게 변환
                            .anId(findAnalyzeRequest.getAnId())
                            .anPtSub(findAnalyzeRequest.getAnPtSub())
                            .anPtDiagnosis(findAnalyzeRequest.getAnPtDiagnosis())
                            .anRegDate(findAnalyzeRequest.getAnRegDate())
                            .anMdDate(analyzeAssignment.getAdMdDate())
                            .anProgressStatus(analyzeAssignment.getAnProgressStatus())
                            .anAnswerDate(null)
                            .build();
                    findAllAnalyzeSituationDto.add(analyzeSituationDto);
                } else {
                    LocalDate latestAnswerDate = analyzeRequestRepository.findLatestAnAnswerDateByAnalyzeRequestList(findAnalyzeRequest);
                    AnalyzeSituationDto analyzeSituationDto = AnalyzeSituationDto.builder()        // 배정 목록 Dto에 맞게 변환
                            .anId(findAnalyzeRequest.getAnId())
                            .anPtSub(findAnalyzeRequest.getAnPtSub())
                            .anPtDiagnosis(findAnalyzeRequest.getAnPtDiagnosis())
                            .anRegDate(findAnalyzeRequest.getAnRegDate())
                            .anMdDate(analyzeAssignment.getAdMdDate())
                            .anProgressStatus(analyzeAssignment.getAnProgressStatus())
                            .anAnswerDate(latestAnswerDate)
                            .build();
                    findAllAnalyzeSituationDto.add(analyzeSituationDto);
                }

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
            AnalyzeAssignment findAnalyzeAssignment = analyzeAssignmentRepository.findByAnalyzeRequestList(findAnalyzeRequestList);

            return createResponseAnalyzeDto(findAnalyzeRequestList, requestClient, findAnalyzeQuestion, findAnalyzeFile, findAnalyzeAssignment);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 신청된 의료 분석 정보 응답 dto 생성
     */
    private AnalyzeResponseDto createResponseAnalyzeDto(AnalyzeRequestList findAnalyzeRequestList, Client requestClient,
                                                        List<AnalyzeRequest> findAnalyzeQuestion, AnalyzeRequestFile findAnalyzeFile,
                                                        AnalyzeAssignment findAnalyzeAssignment) {
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
                .anProgressStatus(findAnalyzeAssignment.getAnProgressStatus())
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
                boolean isNullAnswer = translationAnswerFileRepository.existsByTrAnswerDateNullAndTranslationRequestList(translationRequestList);
                if (isNullAnswer) {
                    TranslationSituationDto translationRequestDto = TranslationSituationDto.builder()
                            .trPtSub(translationRequestList.getTrPtSub())
                            .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                            .trRegDate(translationRequestList.getTrRegDate())
                            .trId(translationRequestList.getTrId())
                            .tamDate(translationAssignment.getTamDate())
                            .trProgressStatus(translationAssignment.getTrProgressStatus())
                            .trAnswerDate(null)
                            .build();
                    findAllTranslationSituationDto.add(translationRequestDto);
                } else {
                    LocalDate latestAnswerDate = translationAnswerFileRepository.findLatestTrAnswerDateByTranslationRequestList(translationRequestList);
                    TranslationSituationDto translationRequestDto = TranslationSituationDto.builder()
                            .trPtSub(translationRequestList.getTrPtSub())
                            .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                            .trRegDate(translationRequestList.getTrRegDate())
                            .trId(translationRequestList.getTrId())
                            .tamDate(translationAssignment.getTamDate())
                            .trProgressStatus(translationAssignment.getTrProgressStatus())
                            .trAnswerDate(latestAnswerDate)
                            .build();
                    findAllTranslationSituationDto.add(translationRequestDto);
                }

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
            TranslationAssignment translationAssignment =
                    translationAssignmentRepository.findByTrId(trId);

            return createTranslationResponseDto(findTranslationRequestList, requestClient, findTranslationRequestFile, findTranslationAnswerFile, translationAssignment);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 신청된 의료 번역 정보 응답 dto 생성
     */
    private TranslationResponseDto createTranslationResponseDto(TranslationRequestList findTranslationRequestList, Client requestClient,
                                                                TranslationRequestFile findTranslationRequestFile,
                                                                TranslationAnswerFile findTranslationAnswerFile,
                                                                TranslationAssignment findTranslationAssignment) {
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
                .trProgressStatus(findTranslationAssignment.getTrProgressStatus())
                .build();
    }

    /**
     * 번역의뢰 답변파일 저장
     */
    @Override
    public boolean saveTranslationAnswerFile(ConsultativeDto consultativeDto, List<MultipartFile> multipartFiles, Long trId, TranslationAnswerFileRequestDto translationAnswerFileRequestDto) throws IOException {
        Consultative consultative = consultativeRepository.findById(consultativeDto.getCId()).get();
        TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).get();
        Long traId = translationAnswerFileRepository.findByFileId(trId);

        TranslationAnswerFileRequestDto newtranslationAnswerFileRequestDto = splitTranslationAnswerFile(consultativeDto, multipartFiles);

        try{
            TranslationAnswerFile translationAnswerFile = TranslationAnswerFile.builder()
                    .trAnswerId(traId)
                    .trAnswer(newtranslationAnswerFileRequestDto.getTrAnswer())
                    .trAnswerDate(translationAnswerFileRequestDto.getTrAnswerDate())
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

    public boolean updateTranslationAnswerFile(ConsultativeDto consultativeDto, List<MultipartFile> multipartFiles, Long trId, TranslationAnswerFileRequestDto translationAnswerFileRequestDto) throws IOException {
        Consultative consultative = consultativeRepository.findById(consultativeDto.getCId()).get();
        TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).get();
        Long traId = translationAnswerFileRepository.findByFileId(trId);
        TranslationAnswerFile translationAnswerFile = translationAnswerFileRepository.findById(trId).get();

        TranslationAnswerFileRequestDto updatetranslationAnswerFileRequestDto = splitTranslationAnswerFile(consultativeDto, multipartFiles);
        deleteTranslationFile(updatetranslationAnswerFileRequestDto, translationAnswerFile);
        try{
            translationAnswerFile = TranslationAnswerFile.builder()
                    .trAnswerId(traId)
                    .trAnswer(updatetranslationAnswerFileRequestDto.getTrAnswer())
                    .trAnswerDate(translationAnswerFileRequestDto.getTrAnswerDate())
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
                        .trAnswer(files.pollFirst())
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

    /**
     * 배정받은 분석의뢰 답변 저장
     */
    @Transactional
    public boolean saveAnalyzeResponse(AnalyzeResponseDto responseDto, Long anId) {
        try {
            AnalyzeRequestList analyzeRequestList = analyzeRequestListRepository.findById(anId)
                    .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 분석의뢰 ID입니다."));

            LocalDate anAnswerDate = responseDto.getAnAnswerDate();

            AnalyzeQuestionDto analyzeQuestionDtoList = splitResponseToQuestionDto(responseDto);

            saveAnalyzeQuestion(analyzeRequestList, analyzeQuestionDtoList, anAnswerDate);

            logger.info("분석 의뢰 답변 저장이 완료되었습니다.");
            return true;
        } catch (Exception e) {
            logger.error("분석 의뢰 답변 저장 중 오류 발생: {}", e.getMessage());
            return false;
        }
    }

    public AnalyzeQuestionDto splitResponseToQuestionDto(AnalyzeResponseDto analyzeResponseDto) {
        return AnalyzeQuestionDto.builder()
                .anAnswerContent(analyzeResponseDto.getAnAnswerContent())
                .build();
    }




    @Transactional
    public void saveAnalyzeQuestion(AnalyzeRequestList savedAnalyzeRequestList, AnalyzeQuestionDto analyzeQuestionDto,
                                    LocalDate anAnswerDate) throws PersistenceException {
        try {
            List<AnalyzeRequest> analyzeRequests = savedAnalyzeRequestList.getAnalyzeRequests();
            List<String> answerContents = analyzeQuestionDto.getAnAnswerContent();

            // 기존에 저장된 답변 업데이트
            for (int i = 0; i < analyzeRequests.size(); i++) {
                AnalyzeRequest analyzeRequest = analyzeRequests.get(i);
                String newAnswerContent = null; // 새로운 값
                String currentAnswerContent = analyzeRequest.getAnAnswerContent(); // 현재 값

                // 새로운 답변이 존재하는 경우에만 가져옴
                if (answerContents != null && i < answerContents.size()) {
                    newAnswerContent = answerContents.get(i);
                }

                // 새로운 값이 기존 값과 다를 때에만 업데이트 수행
                if (!Objects.equals(newAnswerContent, currentAnswerContent)) {
                    // 답변 업데이트
                    analyzeRequest.updateAnAnswerContent(newAnswerContent);

                    // 답변이 있는 경우에만 업데이트 수행
                    if (newAnswerContent != null && !newAnswerContent.isEmpty()) {
                        // 답변일 업데이트
                        analyzeRequest.updateAnAnswerDate(anAnswerDate);
                    }

                    analyzeRequestRepository.save(analyzeRequest);
                }
            }
        } catch (PersistenceException e) {
            logger.info("분석 의뢰 답변지 저장 실패");
            throw new PersistenceException();
        }
    }


    /**
     * 배정받은 자문의뢰 답변 저장
     */
    @Transactional
    public boolean saveAdviceResponse(AllAdviceRequestDto responseDto, Long adId) {
        try {
            AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adId)
                    .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 자문의뢰 ID입니다."));

            LocalDate adAnswerDate = responseDto.getAdAnswerDate();

            AdviceQuestionRequestDto adviceQuestionRequestDtoList = splitResponseToQuestionDto(responseDto);

            saveAdviceQuestion(adviceRequestList, adviceQuestionRequestDtoList, adAnswerDate);

            logger.info("분석 의뢰 답변 저장이 완료되었습니다.");
            return true;
        } catch (Exception e) {
            logger.error("분석 의뢰 답변 저장 중 오류 발생: {}", e.getMessage());
            return false;
        }
    }

    public AdviceQuestionRequestDto splitResponseToQuestionDto(AllAdviceRequestDto allAdviceRequestDto) {
        return AdviceQuestionRequestDto.builder()
                .adAnswerContent(allAdviceRequestDto.getAdAnswerContent())
                .build();
    }




    @Transactional
    public void saveAdviceQuestion(AdviceRequestList savedAdviceRequestList, AdviceQuestionRequestDto adviceQuestionRequestDto,
                                    LocalDate adAnswerDate) throws PersistenceException {
        try {
            List<AdviceQuestion> adviceQuestions = savedAdviceRequestList.getAdviceQuestions();
            List<String> answerContents = adviceQuestionRequestDto.getAdAnswerContent();

            // 기존에 저장된 답변 업데이트
            for (int i = 0; i < adviceQuestions.size(); i++) {
                AdviceQuestion adviceQuestion = adviceQuestions.get(i);
                String newAnswerContent = null; // 새로운 값
                String currentAnswerContent = adviceQuestion.getAdAnswerContent(); // 현재 값

                // 새로운 답변이 존재하는 경우에만 가져옴
                if (answerContents != null && i < answerContents.size()) {
                    newAnswerContent = answerContents.get(i);
                }

                // 새로운 값이 기존 값과 다를 때에만 업데이트 수행
                if (!Objects.equals(newAnswerContent, currentAnswerContent)) {
                    // 답변 업데이트
                    adviceQuestion.updateAdAnswerContent(newAnswerContent);

                    // 답변이 있는 경우에만 업데이트 수행
                    if (newAnswerContent != null && !newAnswerContent.isEmpty()) {
                        // 답변일 업데이트
                        adviceQuestion.updateAdAnswerDate(adAnswerDate);
                    }

                    adviceQuestionRepository.save(adviceQuestion);
                }
            }
        } catch (PersistenceException e) {
            logger.info("자문 의뢰 답변지 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 수정파일과 기존 파일 변화비교
     */
    private void deleteIfNotEqual(Path filePath, String fileValue, String requestValue) throws IOException {
        if (!fileValue.equals(requestValue)) {
            Path filePathToDelete = filePath.resolve(Paths.get(fileValue));
            deleteFile(filePathToDelete);
        }
    }

    /**
     * 기존 파일 삭제
     */
    private void deleteFile(Path filePathToDelete) throws IOException {
        if (Files.exists(filePathToDelete)) {
            try {
                Files.delete(filePathToDelete);
                System.out.println("File deleted successfully: " + filePathToDelete);
            } catch (IOException e) {
                System.err.println("Error deleting file: " + filePathToDelete);
                e.printStackTrace();
                throw e; // Rethrow the exception to handle it in the upper layers if needed
            }
        } else {
            System.out.println("File not found: " + filePathToDelete);
        }
    }

    /**
     * 경로 생성 및 삭제메서드 호출
     */
    private void deleteTranslationFile(TranslationAnswerFileRequestDto translationAnswerFileRequestDto, TranslationAnswerFile translationAnswerFile) throws IOException {
        Path projectPath;
        if (System.getProperty("user.dir").contains("medic")) {
            projectPath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/file/translationanswer/");
        } else {
            projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/translationanswer/");
        }

        deleteIfNotEqual(projectPath, translationAnswerFile.getTrAnswer(), translationAnswerFileRequestDto.getTrAnswer());
    }
}
