package com.example.medic.advice.service;

import com.example.medic.advice.domain.AdviceFile;
import com.example.medic.advice.repository.AdviceFileRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.NoSuchElementException;

@Service
@Slf4j
@AllArgsConstructor
public class AdviceFileService {
    private AdviceFileRepository adviceFileRepository;

    /**
     * 자문의뢰 파일조회
     */
    public Resource findAdviceRequestFile(Long adId, String fileType) throws MalformedURLException {
        Long fileId = adviceFileRepository.findByFileId(adId);
        AdviceFile adviceFile = adviceFileRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("AdviceFile not found with id: " + fileId));

        if (adviceFile != null) {
            if (System.getProperty("user.dir").contains("medic")) {
                String baseUrl = "file:" + System.getProperty("user.dir") + "/src/main/resources/static/file/advicerequest/";
                return getFileResource(baseUrl, fileType, adviceFile);
            } else {
                String baseUrl = "file:" + System.getProperty("user.dir") + "/medic/src/main/resources/static/file/advicerequest/";
                return getFileResource(baseUrl, fileType, adviceFile);
            }
        }
        return null;
    }

    private Resource getFileResource(String baseUrl, String fileType, AdviceFile adviceFile) throws MalformedURLException {
        Resource resource = null;
        switch (fileType) {
            case "adReqForm":
                resource = new UrlResource(baseUrl + adviceFile.getAdReqForm());
                return resource;
            case "adDiagnosis":
                resource = new UrlResource(baseUrl + adviceFile.getAdDiagnosis());
                return resource;
            case "adRecord":
                resource = new UrlResource(baseUrl + adviceFile.getAdRecord());
                return resource;
            case "adFilm":
                resource = new UrlResource(baseUrl + adviceFile.getAdFilm());
                return resource;
            case "adOther":
                resource = new UrlResource(baseUrl + adviceFile.getAdOther());
                return resource;
            default:
                throw new IllegalArgumentException("Invalid file type: " + fileType);
        }
    }
}
