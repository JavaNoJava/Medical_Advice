package com.example.medic.files.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import java.nio.file.FileAlreadyExistsException;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.util.*;
import java.nio.file.Files;
@Component
public class FileHandler {
    private final List<String> extensions = new ArrayList<>(List.of("jpeg", "png", "gif", "mp4", "mp3", "m4a", "mpeg", "wav", "wma", "zip"));

    public Deque<String> parseFile(Path path, List<MultipartFile> multipartFiles) throws IOException {

        try{
            Files.createDirectory(path);
            Deque <String> pathList = saveFiledirectory(path, multipartFiles);
            return pathList;
        } catch (FileAlreadyExistsException e){
            Deque <String> pathList = saveFiledirectory(path, multipartFiles);
            return pathList;
        } catch (NoSuchFileException e) {
            e.printStackTrace();
            return null;
        }catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static Deque<String> saveFiledirectory(Path path, List<MultipartFile> multipartFiles) throws IOException {
        Deque<String> pathList = new ArrayDeque<>();
        for(MultipartFile file : multipartFiles) {
            if (file != null && !file.isEmpty()) {
                String filename = file.getOriginalFilename();
                String extension = filename.substring(filename.lastIndexOf("."));
                String saveFilename = UUID.randomUUID() + extension;

                File saveFile = new File(path.toFile(), saveFilename);
                file.transferTo(saveFile);

                pathList.add(saveFilename);
            }
        }
        return pathList;
    }
}