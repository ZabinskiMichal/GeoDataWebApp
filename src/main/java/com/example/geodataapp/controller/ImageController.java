package com.example.geodataapp.controller;


import com.example.geodataapp.service.ImageService;
import com.example.geodataapp.service.ImageServiceImpl;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/geodataapp/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private ImageServiceImpl imageService;

    @Autowired
    public ImageController(ImageServiceImpl imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload/{point_id}")
    public ResponseEntity<?> uploadImage(@PathVariable("point_id") Long point_id,
                                         @RequestParam("image") List<MultipartFile> files) throws IOException {
//        String uploadImage = imageService.uploadImage(files);
        imageService.uploadImage(files, point_id);

        return ResponseEntity.status(HttpStatus.OK)
                .body("Dodano pliki");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> downloadImage(@PathVariable Long id){
        byte[] imageData = imageService.downloadImage(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }
}
