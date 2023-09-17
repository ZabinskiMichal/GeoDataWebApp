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

@RestController
@RequestMapping("/geodataapp/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private ImageServiceImpl imageService;

    @Autowired
    public ImageController(ImageServiceImpl imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file) throws IOException {
        String uploadImage = imageService.uploadImage(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> downloadImage(@PathVariable Long id){
        byte[] imageData = imageService.downloadImage(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }
}
