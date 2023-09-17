package com.example.geodataapp.service;


import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

//metody w interfejsie są dostępne domyślnie
public interface ImageService {

    String uploadImage(MultipartFile file) throws IOException;

    byte[] downloadImage(Long id);
}
