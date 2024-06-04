package com.example.medic.consultative.service;

import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.repository.TranslationAnswerFileRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ConsultativeFileService {
    private final TranslationAnswerFileRepository translationAnswerFileRepository;

    /**
     * @return 번역의뢰 답변파일조회
     */
    public Resource findTranslationAnswerFile(Long trId) throws MalformedURLException {
        Long fileId = translationAnswerFileRepository.findByFileId(trId);
        TranslationAnswerFile translationAnswerFile = translationAnswerFileRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("AdviceFile not found with id: " + fileId));

        if (translationAnswerFile != null) {
            if (System.getProperty("user.dir").contains("medic")) {
                String baseUrl = "file:" + System.getProperty("user.dir") + "/src/main/resources/static/file/translationanswer/";
                return getFileResource(baseUrl, translationAnswerFile);
            } else {
                String baseUrl = "file:" + System.getProperty("user.dir") + "/medic/src/main/resources/static/file/translationanswer/";
                return getFileResource(baseUrl, translationAnswerFile);
            }
        }
        return null;
    }

    private Resource getFileResource(String baseUrl, TranslationAnswerFile translationAnswerFile){
        try {
            Resource resource = new UrlResource(baseUrl + translationAnswerFile.getTrAnswer());
            return resource;
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid file type: ");
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }
}
