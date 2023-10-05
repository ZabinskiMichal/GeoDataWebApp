package com.example.geodataapp.service;


import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

//metody w interfejsie są dostępne domyślnie
public interface ImageService {

    String uploadImage(List<MultipartFile> files, Long pointID) throws IOException;

    byte[] downloadImage(Long id);

    List<byte[]> findImagesByPointId(Long pointID);

    List<Long> getImagesIdForPoint(Long pointID);

}
