package com.example.geodataapp.service;

import com.example.geodataapp.model.ImageData;
import com.example.geodataapp.model.Point;
import com.example.geodataapp.repository.ImageRepository;
import com.example.geodataapp.repository.PointRepository;
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
    private PointRepository pointRepository;


    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository, PointRepository pointRepository) {
        this.imageRepository = imageRepository;
        this.pointRepository = pointRepository;
    }

    @Override
    public String uploadImage(List<MultipartFile> files, Long pointID) throws IOException {

        Point point = pointRepository.findById(pointID)
                .orElseThrow(() -> new RuntimeException("Point with id: " + pointID + " not found"));

        for(MultipartFile file : files){

            ImageData imageData = imageRepository.save(ImageData.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(ImageUtils.compressImage(file.getBytes()))
                    .point(point)
                    .build());
            System.out.println("Zapisywanie: " + file.getOriginalFilename());

        }


        return "Zapisywanie nie powiadło sie";
    }



    @Override
    public byte[] downloadImage(Long id) {
        Optional<ImageData> dbImage = imageRepository.findById(id);

        byte[] images = ImageUtils.decompressImage(dbImage.get().getImageData());

        return images;
    }

    @Override
    public List<byte[]> findImagesByPointId(Long pointID) {
        return null;
    }

    @Override
    public List<Long> getImagesIdForPoint(Long pointID) {

        System.out.println("Szukanie id");

        Optional<List<Long>> foundImages = imageRepository.getImagesIdByPointId(pointID);

        System.out.println("Znalezione id: " + foundImages.toString());

        if(foundImages.isPresent()){
            return foundImages.get();
        }

        throw new RuntimeException("Images not found for point with id: " + pointID);

    }
}
