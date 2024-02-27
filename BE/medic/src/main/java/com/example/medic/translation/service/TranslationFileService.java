package com.example.medic.translation.service;

import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.repository.TranslationRequestFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TranslationFileService {
    private final TranslationRequestFileRepository translationRequestFileRepository;

    /**
     * @return 번역의뢰 파일조회
     */
    public Resource findTranslationFile(Long trId) throws MalformedURLException {
        Long fileId = translationRequestFileRepository.findByFileId(trId);
        TranslationRequestFile translationRequestFile = translationRequestFileRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("AdviceFile not found with id: " + fileId));

        if (translationRequestFile != null) {
            if (System.getProperty("user.dir").contains("medic")) {
                String baseUrl = "file:" + System.getProperty("user.dir") + "/src/main/resources/static/file/translationrequest/";
                return getFileResource(baseUrl, translationRequestFile);
            } else {
                String baseUrl = "file:" + System.getProperty("user.dir") + "/medic/src/main/resources/static/file/translationrequest/";
                return getFileResource(baseUrl, translationRequestFile);
            }
        }
        return null;
    }

    private Resource getFileResource(String baseUrl, TranslationRequestFile translationRequestFile){
        try {
            Resource resource = new UrlResource(baseUrl + translationRequestFile.getTrMtl());
            return resource;
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid file type: ");
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }
}

