package com.example.geodataapp.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface S3ImageService {

    String uploadImageToS3(List<MultipartFile> files, Long pointID) throws IOException;

}
