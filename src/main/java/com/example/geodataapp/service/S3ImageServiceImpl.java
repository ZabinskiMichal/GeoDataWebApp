package com.example.geodataapp.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@Slf4j
public class S3ImageServiceImpl implements S3ImageService{

    @Value("${application.bucket.name}")
    private String bucketName;


    private AmazonS3 s3Client;

    @Autowired
    public S3ImageServiceImpl(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }


    public String uploadFile(List<MultipartFile> files, Long pointId){

        for (MultipartFile file : files){
            File fileObj = convertMultiPartFileToFile(file);
            String filename = System.currentTimeMillis()+"_"+file.getOriginalFilename();
            s3Client.putObject(new PutObjectRequest(bucketName, filename, fileObj));
            fileObj.delete();
        }

        return "Files to s3 uploaded successfully";
    }


    @Override
    public byte[] downloadFile(String fileName){
        S3Object s3Object = s3Client.getObject(bucketName, fileName);

        S3ObjectInputStream inputStream = s3Object.getObjectContent();

        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }



    private File convertMultiPartFileToFile(MultipartFile file){
        File convertedFile = new File(file.getOriginalFilename());

        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e){
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;

    }
}
