package com.example.medic.translation.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.service.ClientService;
import com.example.medic.files.handler.FileHandler;
import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.TranslationFileDto;
import com.example.medic.translation.dto.TranslationListDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationResponseDto;
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
import java.util.Deque;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TranslationServiceImpl implements TranslationService {

    private final Logger logger = LoggerFactory.getLogger(TranslationServiceImpl.class);
    private final TranslationRequestFileRepository translationRequestFileRepository;
    private final TranslationRequestListRepository translationRequestListRepository;
    private final TranslationAnswerFileRepository translationAnswerFileRepository;
    private final TranslationAssignmentRepository translationAssignmentRepository;
    private final ClientService clientService;
    private final FileHandler fileHandler;

    /**
     * @return 번역 의뢰 신청 저장
     */
    @Override
    @Transactional
    public boolean saveTranslationRequest(TranslationRequestDto requestDto, ClientInfoDto clientInfoDto, List<MultipartFile> multipartFiles) throws IOException {
        Client currentClient = clientService.findClient(clientInfoDto.getUId());
        TranslationListDto translationListDto = splitRequestToTranslationListDto(requestDto);
        TranslationFileDto translationFileDto = splitRequestToTranslationFileDto(requestDto ,multipartFiles);

        try {
            TranslationRequestList savedTranslationList = saveTranslationList(translationListDto, currentClient);
            saveTranslationFile(savedTranslationList, translationFileDto);

            TranslationAssignment savedTranslationAssignment = TranslationAssignment.builder()  // 번역 배정 생성
                    .translationRequestList(savedTranslationList)
                    .build();

            TranslationAnswerFile savedTranslationAnswerFile = TranslationAnswerFile.builder()  // 번역 답변 생성
                    .translationRequestList(savedTranslationList)
                    .build();

            translationAssignmentRepository.save(savedTranslationAssignment);
            translationAnswerFileRepository.save(savedTranslationAnswerFile);
            return true;
        } catch (PersistenceException e) {
            logger.info("번역 의뢰 신청 저장중 이상 오류로 인한 실패");
            return false;
        }
    }

    /**
     * @return 요청 받은 번역 의뢰 파일 변환
     */
    @Override
    public TranslationFileDto splitRequestToTranslationFileDto(TranslationRequestDto translationRequestDto, List<MultipartFile> multipartFiles) throws IOException {
        try {
            if (multipartFiles.size() != 0) {
                Path projectPath;
                if (System.getProperty("user.dir").contains("medic")) {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/file/translationrequest/");
                } else {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/translationrequest/");
                }
                Deque<String> files = fileHandler.parseFile(projectPath, multipartFiles);
                return TranslationFileDto.builder()
                        .trMtl(translationRequestDto.getTrMtl().equals("no_empty_file") ? files.pollFirst() : translationRequestDto.getTrMtl())
                        .build();
            }
        } catch (NullPointerException e){
            return TranslationFileDto.builder()
                    .trMtl(translationRequestDto.getTrMtl())
                    .build();
        }
        return null;
    }

    /**
     * @return 요청 받은 번역 의뢰 내용 변환
     */
    @Override
    public TranslationListDto splitRequestToTranslationListDto(TranslationRequestDto request) {
        return TranslationListDto.builder()
                .trPtName(request.getTrPtName())
                .trPtSsNum(request.getTrPtSsNum())
                .trPtSub(request.getTrPtSub())
                .trPtDiagnosis(request.getTrPtDiagnosis())
                .trPtDiagContent(request.getTrPtDiagContent())
                .trEtc(request.getTrEtc())
                .build();
    }

    /**
     * @return 요청 받은 번역 의뢰 내용 저장
     */
    @Override
    @Transactional
    public TranslationRequestList saveTranslationList(TranslationListDto translationListDto,
                                                      Client client) throws PersistenceException {
        try {
            TranslationRequestList translationRequestList = TranslationRequestList.builder()
                    .trPtName(translationListDto.getTrPtName())
                    .trPtSsNum(translationListDto.getTrPtSsNum())
                    .trPtSub(translationListDto.getTrPtSub())
                    .trPtDiagnosis(translationListDto.getTrPtDiagnosis())
                    .trPtDiagContent(translationListDto.getTrPtDiagContent())
                    .trEtc(translationListDto.getTrEtc())
                    .trRegDate(LocalDate.now())
                    .client(client)
                    .build();
            return translationRequestListRepository.save(translationRequestList);
        } catch (PersistenceException e) {
            logger.info("번역 의뢰 내역 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 요청 받은 번역 의뢰 파일 저장
     */
    @Override
    @Transactional
    public void saveTranslationFile(TranslationRequestList savedTranslationRequestList,
                                    TranslationFileDto translationFileDto) throws PersistenceException {
        try {
            TranslationRequestFile translationRequestFile = TranslationRequestFile.builder()
                    .trMtl(translationFileDto.getTrMtl())
                    .translationRequestList(savedTranslationRequestList)
                    .build();
            translationRequestFileRepository.save(translationRequestFile);
        } catch (PersistenceException e) {
            logger.info("번역 의뢰 파일 저장 실패");
            throw new PersistenceException();
        }

    }

    /**
     * 번역의뢰 상세 조회
     */
    public TranslationResponseDto getTranslationDetail(Long trId) {
        TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).get();
        TranslationRequestFile translationRequestFile = translationRequestFileRepository.findById(trId).get();
        TranslationAnswerFile translationAnswerFile = translationAnswerFileRepository.findAnswerFileById(trId);
        TranslationAssignment translationAssignment = translationAssignmentRepository.findByTrId(trId);

        TranslationResponseDto translationResponseDto = TranslationResponseDto.builder()
                .trId(translationRequestList.getTrId())
                .trPtName(translationRequestList.getTrPtName())
                .trPtSsNum(translationRequestList.getTrPtSsNum())
                .trPtSub(translationRequestList.getTrPtSub())
                .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                .trPtDiagContent(translationRequestList.getTrPtDiagContent())
                .trEtc(translationRequestList.getTrEtc())
                .trMtl(translationRequestFile.getTrMtl())
                .trAnswer(translationAnswerFile == null ? "empty_file" : translationAnswerFile.getTrAnswer())
                .tamDate(translationAssignment.getTamDate())
                .build();

        return translationResponseDto;
    }

    /**
     * 번역의뢰 수정
     */
    @Transactional
    public boolean updateTranslationRequest(Long trId, TranslationResponseDto updateDto, List<MultipartFile> multipartFiles) throws IOException {
        TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).orElse(null);
        TranslationRequestFile translationRequestFile = translationRequestFileRepository.findById(trId).get();
        Long fid = translationRequestFileRepository.findByFileId(trId);

        TranslationFileDto translationFileDto = splitUpdateToFileDto(updateDto, multipartFiles);
        deleteTranslationFile(translationRequestFile, translationFileDto);

        // 번역의뢰 리스트 수정
        TranslationRequestList updatedTranslationRequestList = translationRequestList.toBuilder()
                .trEtc(updateDto.getTrEtc())
                .trPtName(updateDto.getTrPtName())
                .trPtSub(updateDto.getTrPtSub())
                .trPtSsNum(updateDto.getTrPtSsNum())
                .trPtDiagnosis(updateDto.getTrPtDiagnosis())
                .trPtDiagContent(updateDto.getTrPtDiagContent())
                .build();

        // 수정일자 업데이트
        updatedTranslationRequestList = updatedTranslationRequestList.toBuilder()
                .trMdDate(LocalDate.now())
                .build();

        //번역의뢰 파일 업데이트
        translationRequestFile = translationRequestFile.builder()
                .tfId(fid)
                .trMtl(translationFileDto.getTrMtl())
                .translationRequestList(translationRequestList)
                .build();
        // 번역의뢰 리스트 저장
        translationRequestListRepository.save(updatedTranslationRequestList);
        translationRequestFileRepository.save(translationRequestFile);

        return true;
    }

    /**
     * 파일 업데이트 Dto 변환
     */
    private TranslationFileDto splitUpdateToFileDto (TranslationResponseDto updateDto, List<MultipartFile> multipartFiles) throws IOException {
        try{
            if (multipartFiles.size() != 0) {
                Path projectPath;
                if (System.getProperty("user.dir").contains("medic")) {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/file/translationrequest/");
                } else {
                    projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/translationrequest/");
                }

                Deque<String> files = fileHandler.parseFile(projectPath, multipartFiles);

                return TranslationFileDto.builder()
                        .trMtl(updateDto.getTrMtl().equals("no_empty_file") ? files.pollFirst() : updateDto.getTrMtl())
                        .build();
            }
        } catch (NullPointerException e) {
            return TranslationFileDto.builder()
                    .trMtl(updateDto.getTrMtl())
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
    private void deleteTranslationFile(TranslationRequestFile translationRequestFile, TranslationFileDto translationFileDto) throws IOException {
        Path projectPath;
        if (System.getProperty("user.dir").contains("medic")) {
            projectPath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/file/translationrequest/");
        } else {
            projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/translationrequest/");
        }

        deleteIfNotEqual(projectPath, translationRequestFile.getTrMtl(), translationFileDto.getTrMtl());
    }
}