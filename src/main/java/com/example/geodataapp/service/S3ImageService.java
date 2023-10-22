package com.example.geodataapp.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface S3ImageService {


    String uploadFile(List<MultipartFile> files, Long pointId);

    byte[] downloadFile(String fileName);

}
