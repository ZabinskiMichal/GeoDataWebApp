package com.example.geodataapp.controller;

import com.example.geodataapp.service.ImageServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/geodataapp/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private ImageServiceImpl imageService;

    @Autowired
    public ImageController(ImageServiceImpl imageService) {
        this.imageService = imageService;
    }


    //add images to exisiting point
    @PostMapping("/upload/{point_id}")
    public ResponseEntity<?> uploadImage(@PathVariable("point_id") Long point_id,
                                         @RequestParam("image") List<MultipartFile> files) throws IOException {
        imageService.uploadImage(files, point_id);

        return ResponseEntity.status(HttpStatus.OK)
                .body("Dodano pliki");
    }


//     Downloands images from db
//    @GetMapping("/frompoint/{pointID}")
//    public void downloadImages(HttpServletResponse response,
//                               @PathVariable Long pointID) throws IOException {
//        List<Long> imageIds = imageService.getImagesIdForPoint(pointID); // Numery obrazów do pobrania
//
//        response.setContentType("application/zip");
//        response.setHeader("Content-Disposition", "attachment;filename=Images.zip");
//
//        try (ZipOutputStream outputStream = new ZipOutputStream(response.getOutputStream())) {
//            for (Long id : imageIds) {
//                byte[] imageData = imageService.downloadImage(id);
//
//                String contentType = "image/png";  // Domyślny Content-Type
//
//                String fileExtension = contentType.equals("image/jpeg") ? "jpg" : "png"; // Przykład rozszerzenia.
//
//                String entryName = "image_" + id + "." + fileExtension;
//
//                outputStream.putNextEntry(new ZipEntry(entryName));
//                outputStream.write(imageData);
//                outputStream.closeEntry();
//            }
//        }
//
//        response.setStatus(HttpStatus.OK.value()); // 200
//    }


//    Downloads images from S3 - not implemented yet
    @GetMapping("/frompoint/{pointID}")
    public void downloadImages(HttpServletResponse response,
                               @PathVariable Long pointID) throws IOException {
        List<Long> imageIds = imageService.getImagesIdForPoint(pointID); // Numery obrazów do pobrania

        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment;filename=Images.zip");

        try (ZipOutputStream outputStream = new ZipOutputStream(response.getOutputStream())) {
            for (Long id : imageIds) {
                byte[] imageData = imageService.downloadImage(id);

                String contentType = "image/png";  // Domyślny Content-Type

                String fileExtension = contentType.equals("image/jpeg") ? "jpg" : "png"; // Przykład rozszerzenia.

                String entryName = "image_" + id + "." + fileExtension;

                outputStream.putNextEntry(new ZipEntry(entryName));
                outputStream.write(imageData);
                outputStream.closeEntry();
            }
        }

        response.setStatus(HttpStatus.OK.value()); // 200
    }
}
