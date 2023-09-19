package com.example.geodataapp.service;


import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

//metody w interfejsie są dostępne domyślnie
public interface ImageService {

    String uploadImage(List<MultipartFile> files) throws IOException;

    byte[] downloadImage(Long id);
}
