package com.example.medic.analyze.service;

import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.*;
import com.example.medic.analyze.repository.AnalyzeAssignmentRepository;
import com.example.medic.analyze.repository.AnalyzeRequestFileRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.service.ClientService;
import com.example.medic.files.handler.FileHandler;
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

@Service
@RequiredArgsConstructor
public class AnalyzeServiceImpl implements AnalyzeService {

    private final Logger logger = LoggerFactory.getLogger(AnalyzeServiceImpl.class);
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final AnalyzeRequestRepository analyzeRequestRepository;
    private final AnalyzeRequestFileRepository analyzeRequestFileRepository;
    private final AnalyzeAssignmentRepository analyzeAssignmentRepository;
    private final ClientService clientService;
    private final FileHandler fileHandler;
    /**
     * @return 분석 의뢰 신청 저장
     */
    @Transactional
    public boolean saveAnalyzeRequest(AnalyzeRequestDto requestDto, ClientInfoDto clientInfoDto, List<MultipartFile> multipartFiles) throws IOException {
        Client currentClient = clientService.findClient(clientInfoDto.getUId());
        AnalyzeRequestListDto analyzeRequestListDto = splitRequestToRequestListDto(requestDto);
        AnalyzeQuestionDto analyzeQuestionDtoList = splitRequestToQuestionDto(requestDto);
        AnalyzeRequestFileDto analyzeRequestFileDto = splitRequestToRequestFileDto(requestDto, multipartFiles);

        try{
            AnalyzeRequestList savedAnalyzeRequestList = saveAnalyzeRequestList(analyzeRequestListDto, currentClient);
            saveAnalyzeQuestion(savedAnalyzeRequestList, analyzeQuestionDtoList);
            saveAnalyzeFile(savedAnalyzeRequestList, analyzeRequestFileDto);

            AnalyzeAssignment analyzeAssignment = AnalyzeAssignment.builder()
                    .analyzeRequestList(savedAnalyzeRequestList)
                    .build();
            analyzeAssignmentRepository.save(analyzeAssignment);

            return true;
        } catch (PersistenceException p){
            logger.info("분석 의뢰 신청 저장 실패");
            return false;
        }
    }

    /**
     * @return 요청 받은 분석 의뢰지 변환
     */
    public AnalyzeRequestListDto splitRequestToRequestListDto(AnalyzeRequestDto analyzeRequestDto) {
        return AnalyzeRequestListDto.builder()
                .anPtName(analyzeRequestDto.getAnPtName())
                .anPtSsNum(analyzeRequestDto.getAnPtSsNum())
                .anPtSub(analyzeRequestDto.getAnPtSub())
                .anPtDiagnosis(analyzeRequestDto.getAnPtDiagnosis())
                .anPtDiagContent(analyzeRequestDto.getAnPtDiagContent())
                .anEtc(analyzeRequestDto.getAnEtc())
                .build();
    }

    /**
     * @return 요청 받은 분석 의뢰 질문지 변환
     */
    public AnalyzeQuestionDto splitRequestToQuestionDto(AnalyzeRequestDto analyzeRequestDto) {
        return AnalyzeQuestionDto.builder()
                .anQuestionContent(analyzeRequestDto.getAnQuestionContent())
                .build();

    }

    /**
     * @return 요청 받은 분석 의뢰 파일 변환
     */
    public AnalyzeRequestFileDto splitRequestToRequestFileDto(AnalyzeRequestDto analyzeRequestDto, List<MultipartFile> multipartFiles) throws IOException {
        try{
            if(multipartFiles.size() !=0) {
                Path projectPath;
                if (System.getProperty("user.dir").contains("medic")) {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/file/analyzerequest/");
                } else {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/analyzerequest/");
                }
                Deque <String> files = fileHandler.parseFile(projectPath, multipartFiles);
                return AnalyzeRequestFileDto.builder()
                        .anReqForm(analyzeRequestDto.getAnReqForm().equals("no_empty_file") ? files.pollFirst() : analyzeRequestDto.getAnReqForm())
                        .anDiagnosis(analyzeRequestDto.getAnDiagnosis().equals("no_empty_file") ? files.pollFirst(): analyzeRequestDto.getAnDiagnosis())
                        .anRecord(analyzeRequestDto.getAnRecord().equals("no_empty_file") ? files.pollFirst(): analyzeRequestDto.getAnRecord())
                        .anFilm(analyzeRequestDto.getAnFilm().equals("no_empty_file") ? files.pollFirst() : analyzeRequestDto.getAnFilm())
                        .anOther(analyzeRequestDto.getAnOther().equals("no_empty_file") ? files.pollFirst() : analyzeRequestDto.getAnOther())
                        .build();
            }
        } catch (NullPointerException e) {
            return AnalyzeRequestFileDto.builder()
                    .anReqForm(analyzeRequestDto.getAnReqForm())
                    .anDiagnosis(analyzeRequestDto.getAnDiagnosis())
                    .anRecord(analyzeRequestDto.getAnRecord())
                    .anFilm(analyzeRequestDto.getAnFilm())
                    .anOther(analyzeRequestDto.getAnOther())
                    .build();
        }
        return null;
    }



    /**
     * @return 분석 의뢰 리스트 내용 저장
     * @throws PersistenceException
     */
    @Transactional
    public AnalyzeRequestList saveAnalyzeRequestList(AnalyzeRequestListDto analyzeRequestListDto,
                                                     Client client) throws PersistenceException {
        try {
            AnalyzeRequestList analyzeRequestList = AnalyzeRequestList.builder()
                    .anPtName(analyzeRequestListDto.getAnPtName())
                    .anPtSsNum(analyzeRequestListDto.getAnPtSsNum())
                    .anPtSub(analyzeRequestListDto.getAnPtSub())
                    .anPtDiagnosis(analyzeRequestListDto.getAnPtDiagnosis())
                    .anPtDiagContent(analyzeRequestListDto.getAnPtDiagContent())
                    .anEtc(analyzeRequestListDto.getAnEtc())
                    .anRegDate(LocalDate.now())
                    .client(client)
                    .build();

            return analyzeRequestListRepository.save(analyzeRequestList);
        } catch (PersistenceException e) {
            logger.info("분석 의뢰 내역 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 분석 의뢰 질문지 저장
     * @throws PersistenceException
     */
    @Transactional
    public void saveAnalyzeQuestion(AnalyzeRequestList savedAnalyzeRequestList,
                                    AnalyzeQuestionDto analyzeQuestionDto) throws PersistenceException {
        try {
            for (String questionContent : analyzeQuestionDto.getAnQuestionContent()) {
                AnalyzeRequest analyzeRequest = AnalyzeRequest.builder()
                        .anQuestionContent(questionContent)
                        .analyzeRequestList(savedAnalyzeRequestList)
                        .build();
                analyzeRequestRepository.save(analyzeRequest);
            }
        } catch (PersistenceException e) {
            logger.info("분석 의뢰 질문지 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 분석 의뢰 파일 저장
     * @throws PersistenceException
     */
    @Transactional
    public void saveAnalyzeFile(AnalyzeRequestList savedAnalyzeRequestList,
                                AnalyzeRequestFileDto analyzeRequestFileDto) throws PersistenceException {
        try {
            AnalyzeRequestFile analyzeRequestFile = AnalyzeRequestFile.builder()
                    .anReqForm(analyzeRequestFileDto.getAnReqForm())
                    .anDiagnosis(analyzeRequestFileDto.getAnDiagnosis())
                    .anRecord(analyzeRequestFileDto.getAnRecord())
                    .anFilm(analyzeRequestFileDto.getAnFilm())
                    .anOther(analyzeRequestFileDto.getAnOther())
                    .analyzeRequestList(savedAnalyzeRequestList)
                    .build();
            analyzeRequestFileRepository.save(analyzeRequestFile);
        } catch (PersistenceException e) {
            logger.info("분석 의뢰 파일 저장 실패");
            throw new PersistenceException();
        }
    }


    /**
     * 분석의뢰 상세 조회
     */
    public AnalyzeResponseDto getAnalyzeRequestDetail(Long anId) {
        AnalyzeRequestList analyzeRequestList = analyzeRequestListRepository.findById(anId).get();
        AnalyzeRequestFile analyzeRequestFile = analyzeRequestFileRepository.findById(anId).get();
        List<AnalyzeRequest> analyzeRequests = analyzeRequestRepository.findByAnIds(anId);
        AnalyzeAssignment analyzeAssignment = analyzeAssignmentRepository.findByAnId(anId);


        AnalyzeResponseDto analyzeResponseDto = AnalyzeResponseDto.builder()
                .anId(analyzeRequestList.getAnId())
                .anEtc(analyzeRequestList.getAnEtc())
                .anPtName(analyzeRequestList.getAnPtName())
                .anPtSub(analyzeRequestList.getAnPtSub())
                .anPtSsNum(analyzeRequestList.getAnPtSsNum())
                .anPtDiagnosis(analyzeRequestList.getAnPtDiagnosis())
                .anPtDiagContent(analyzeRequestList.getAnPtDiagContent())
                .analyzeRequests(analyzeRequests)
                .anReqForm(analyzeRequestFile.getAnReqForm())
                .anDiagnosis(analyzeRequestFile.getAnDiagnosis())
                .anRecord(analyzeRequestFile.getAnRecord())
                .anFilm(analyzeRequestFile.getAnFilm())
                .anOther(analyzeRequestFile.getAnOther())
                .adMdDate(analyzeAssignment.getAdMdDate())
                .anProgressStatus(analyzeAssignment.getAnProgressStatus())
                .build();

        return analyzeResponseDto;
    }

    /**
     * 분석의뢰 수정
     */
    @Transactional
    public boolean updateAnalyzeRequest(Long anId, AnalyzeUpdateDto updateDto, List<MultipartFile> multipartFiles) throws IOException {
        AnalyzeRequestList analyzeRequestList = analyzeRequestListRepository.findById(anId).orElse(null);
        AnalyzeRequestFile analyzeRequestFile = analyzeRequestFileRepository.findById(anId).get();
        Long fid = analyzeRequestFileRepository.findByFileId(anId);

        AnalyzeRequestFileDto analyzeRequestFileDto = splitUpdateToFileDto(updateDto, multipartFiles);
        deleteAnalyzeFile(analyzeRequestFile, analyzeRequestFileDto);

        // 분석의뢰 리스트 수정
        AnalyzeRequestList updatedAnalyzeRequestList = analyzeRequestList.toBuilder()
                .anEtc(updateDto.getAnEtc())
                .anPtName(updateDto.getAnPtName())
                .anPtSub(updateDto.getAnPtSub())
                .anPtSsNum(updateDto.getAnPtSsNum())
                .anPtDiagnosis(updateDto.getAnPtDiagnosis())
                .anPtDiagContent(updateDto.getAnPtDiagContent())
                .build();

        // 분석의뢰 질문 수정
        AnalyzeQuestionDto analyzeQuestionDto = AnalyzeQuestionDto.builder()
                .anQuestionContent(updateDto.getAnQuestionContent())
                .build();
        updateQuestion(analyzeRequestList.getAnId(), analyzeQuestionDto);

        // 수정일자 업데이트
        updatedAnalyzeRequestList = updatedAnalyzeRequestList.toBuilder()
                .anMdDate(LocalDate.now())
                .build();

        //분석의뢰 파일 업데이트
        analyzeRequestFile = AnalyzeRequestFile.builder()
                .anfId(fid)
                .anReqForm(analyzeRequestFileDto.getAnReqForm())
                .anDiagnosis(analyzeRequestFileDto.getAnDiagnosis())
                .anRecord(analyzeRequestFileDto.getAnRecord())
                .anFilm(analyzeRequestFileDto.getAnFilm())
                .anOther(analyzeRequestFileDto.getAnOther())
                .analyzeRequestList(analyzeRequestList)
                .build();

        // 분석의뢰 리스트 저장
        analyzeRequestListRepository.save(updatedAnalyzeRequestList);

        //분석의뢰 파일저장
        analyzeRequestFileRepository.save(analyzeRequestFile);

        return true;
    }

    @Transactional
    public boolean updateQuestion(Long anId, AnalyzeQuestionDto analyzeQuestionDto) throws PersistenceException {
        AnalyzeRequestList analyzeRequestList = analyzeRequestListRepository.findById(anId)
                .orElseThrow(() -> new PersistenceException("AnalyzeRequestList not found with id: " + anId));
        List<AnalyzeRequest> existingQuestions = analyzeRequestRepository.findByAnIds(anId);
        try {
            // 기존 질문 삭제 전 로그
            logger.info("기존 질문 삭제 전: {}", existingQuestions);

            // 기존 질문 삭제
            analyzeRequestRepository.deleteAll(existingQuestions);

            // 기존 질문 삭제 후 로그
            logger.info("기존 질문 삭제 후: {}", existingQuestions);

            // 수정된 질문 추가
            List<AnalyzeRequest> newQuestions = new ArrayList<>();
            for (String questionContent : analyzeQuestionDto.getAnQuestionContent()) {
                AnalyzeRequest newQuestion = AnalyzeRequest.builder()
                        .anQuestionContent(questionContent)
                        .analyzeRequestList(analyzeRequestList)
                        .build();
                newQuestions.add(newQuestion);
            }
            analyzeRequestRepository.saveAll(newQuestions);
        } catch (PersistenceException p) {
            logger.error("분석의뢰 질문 수정 실패", p);
            throw new PersistenceException("분석의뢰 질문 수정 실패", p);
        }
        return true;
    }


    /**
     * 파일 업데이트 Dto 변환
     */
    private AnalyzeRequestFileDto splitUpdateToFileDto (AnalyzeUpdateDto analyzeUpdateDto, List<MultipartFile> multipartFiles) throws IOException {
        try{
            if (multipartFiles.size() != 0 && multipartFiles != null) {
                Path projectPath;
                if (System.getProperty("user.dir").contains("medic")) {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/file/analyzerequest/");
                } else {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/analyzerequest/");
                }

                Deque <String> files = fileHandler.parseFile(projectPath, multipartFiles);

                return AnalyzeRequestFileDto.builder()
                        .anReqForm(analyzeUpdateDto.getAnReqForm().equals("no_empty_file") ? files.pollFirst() : analyzeUpdateDto.getAnReqForm())
                        .anDiagnosis(analyzeUpdateDto.getAnDiagnosis().equals("no_empty_file") ? files.pollFirst(): analyzeUpdateDto.getAnDiagnosis())
                        .anRecord(analyzeUpdateDto.getAnRecord().equals("no_empty_file") ? files.pollFirst(): analyzeUpdateDto.getAnRecord())
                        .anFilm(analyzeUpdateDto.getAnFilm().equals("no_empty_file") ? files.pollFirst() : analyzeUpdateDto.getAnFilm())
                        .anOther(analyzeUpdateDto.getAnOther().equals("no_empty_file") ? files.pollFirst() : analyzeUpdateDto.getAnOther())
                        .build();
            }
        } catch (NullPointerException e) {
            return AnalyzeRequestFileDto.builder()
                    .anReqForm(analyzeUpdateDto.getAnReqForm())
                    .anDiagnosis(analyzeUpdateDto.getAnDiagnosis())
                    .anRecord(analyzeUpdateDto.getAnRecord())
                    .anFilm(analyzeUpdateDto.getAnFilm())
                    .anOther(analyzeUpdateDto.getAnOther())
                    .build();
        }
        return null;
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
    private void deleteAnalyzeFile(AnalyzeRequestFile analyzeRequestFile, AnalyzeRequestFileDto analyzeRequestFileDto) throws IOException {
        Path projectPath;
        if (System.getProperty("user.dir").contains("medic")) {
            projectPath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/file/analyzerequest/");
        } else {
            projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/analyzerequest/");
        }

        deleteIfNotEqual(projectPath, analyzeRequestFile.getAnReqForm(), analyzeRequestFileDto.getAnReqForm());
        deleteIfNotEqual(projectPath, analyzeRequestFile.getAnDiagnosis(), analyzeRequestFileDto.getAnDiagnosis());
        deleteIfNotEqual(projectPath, analyzeRequestFile.getAnRecord(), analyzeRequestFileDto.getAnRecord());
        deleteIfNotEqual(projectPath, analyzeRequestFile.getAnFilm(), analyzeRequestFileDto.getAnFilm());
        deleteIfNotEqual(projectPath, analyzeRequestFile.getAnOther(), analyzeRequestFileDto.getAnOther());
    }
}

