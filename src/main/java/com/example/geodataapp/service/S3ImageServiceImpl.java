package com.example.geodataapp.service;

import com.example.geodataapp.model.ImageData;
import com.example.geodataapp.model.Point;
import com.example.geodataapp.model.S3ImageData;
import com.example.geodataapp.repository.PointRepository;
import com.example.geodataapp.repository.S3ImageRepository;
import com.example.geodataapp.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class S3ImageServiceImpl implements S3ImageService{


    private S3ImageRepository s3ImageRepository;
    private PointRepository pointRepository;


    @Autowired
    public S3ImageServiceImpl(S3ImageRepository s3ImageRepository,
                              PointRepository pointRepository) {
        this.s3ImageRepository = s3ImageRepository;
        this.pointRepository = pointRepository;
    }



    @Override
    public String uploadImageToS3(List<MultipartFile> files, Long pointID) throws IOException{
        return null;

    }
}
