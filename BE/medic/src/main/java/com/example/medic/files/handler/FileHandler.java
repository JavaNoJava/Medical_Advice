package com.example.medic.files.handler;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import java.nio.file.FileAlreadyExistsException;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.util.*;
import java.nio.file.Files;
@Component
@Slf4j
public class FileHandler {
    private final AmazonS3 amazonS3;
    private final String bucket;

    public FileHandler(AmazonS3 amazonS3, @Value("${cloud.aws.s3.bucket}") String bucket) {
        this.amazonS3 = amazonS3;
        this.bucket = bucket;
    }

    private final List<String> extensions = new ArrayList<>(List.of("jpeg", "png", "gif", "mp4", "mp3", "m4a", "mpeg", "wav", "wma", "zip"));

    public Deque<String> parseFile(String dirName, List<MultipartFile> multipartFiles) throws IOException {

        try{
//            Files.createDirectory(path);
            Deque <String> pathList = saveFiledirectory(dirName, multipartFiles);
            return pathList;
//        } catch (FileAlreadyExistsException e){
//            Deque <String> pathList = saveFiledirectory(path, multipartFiles);
//            return pathList;
        } catch (NoSuchFileException e) {
            e.printStackTrace();
            return null;
        }catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private Deque<String> saveFiledirectory(String dirName, List<MultipartFile> multipartFiles) throws IOException {
        Deque<String> pathList = new ArrayDeque<>();
        for(MultipartFile file : multipartFiles) {
            if (file != null && !file.isEmpty()) {
//                String filename = file.getOriginalFilename();
//                String extension = filename.substring(filename.lastIndexOf("."));
//                String saveFilename = UUID.randomUUID() + extension;
//
//                File saveFile = new File(path.toFile(), saveFilename);
//                file.transferTo(saveFile);
//
//                pathList.add(saveFilename);
                // 파일 이름에서 공백을 제거한 새로운 파일 이름 생성
                String originalFileName = file.getOriginalFilename();

                // UUID를 파일명에 추가
                String uuid = UUID.randomUUID().toString();
                String uniqueFileName = uuid + "_" + originalFileName.replaceAll("\\s", "_");

                String fileName = dirName + "/" + uniqueFileName;
                log.info("fileName: " + fileName);
                File uploadFile = convert(file);

                String uploadImageUrl = putS3(uploadFile, fileName);
                removeNewFile(uploadFile);
                pathList.add(uploadImageUrl);
            }
        }
        return pathList;
    }

    private File convert(MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String uniqueFileName = uuid + "_" + originalFileName.replaceAll("\\s", "_");

        File convertFile = new File(uniqueFileName);
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            } catch (IOException e) {
                log.error("파일 변환 중 오류 발생: {}", e.getMessage());
                throw e;
            }
            return convertFile;
        }
        throw new IllegalArgumentException(String.format("파일 변환에 실패했습니다. %s", originalFileName));
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile));
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }
}