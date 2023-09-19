package com.example.geodataapp.service;

import com.example.geodataapp.model.ImageData;
import com.example.geodataapp.repository.ImageRepository;
import com.example.geodataapp.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService{


    private ImageRepository imageRepository;


    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public String uploadImage(List<MultipartFile> files) throws IOException {

        for(MultipartFile file : files){

            ImageData imageData = imageRepository.save(ImageData.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(ImageUtils.compressImage(file.getBytes())).build());
            System.out.println("Zapisywanie: " + file.getOriginalFilename());

//            if(imageData != null){
//                return "Pomyślnie zapisano plik o nazwie: " + file.getOriginalFilename();
//            }

        }

//        ImageData imageData = imageRepository.save(ImageData.builder()
//                .name(file.getOriginalFilename())
//                .type(file.getContentType())
//                .imageData(ImageUtils.compressImage(file.getBytes())).build());

//        if(imageData != null){
//            return "Pomyślnie zapisano plik o nazwie: " + file.getOriginalFilename();
//        }

        return "Zapisywanie nie powiadło sie";
    }

    @Override
    public byte[] downloadImage(Long id) {
        Optional<ImageData> dbImage = imageRepository.findById(id);

        byte[] images = ImageUtils.decompressImage(dbImage.get().getImageData());

        return images;
    }
}
