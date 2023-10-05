package com.example.geodataapp.controller;


import com.example.geodataapp.service.ImageService;
import com.example.geodataapp.service.ImageServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
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

    @PostMapping("/upload/{point_id}")
    public ResponseEntity<?> uploadImage(@PathVariable("point_id") Long point_id,
                                         @RequestParam("image") List<MultipartFile> files) throws IOException {
//        String uploadImage = imageService.uploadImage(files);
        imageService.uploadImage(files, point_id);

        return ResponseEntity.status(HttpStatus.OK)
                .body("Dodano pliki");
    }

    @GetMapping("/{pointId}")
    public ResponseEntity<List<byte[]>> downloadImages(@PathVariable Long pointId){

        List<Long> idsToDownload = List.of(15L, 16L);
        List<byte[]> images = new ArrayList<>();

        for (Long id : idsToDownload){
            byte[] imageData = imageService.downloadImage(id);
            images.add(imageData);
        }

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(images);
    }


    @GetMapping("/image/{pointID}")
    public void downloadImages(HttpServletResponse response,
                               @PathVariable Long pointID) throws IOException {
//        List<Long> imageIds = Arrays.asList(18L, 19L); // Numery obrazów do pobrania
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


//    WORKS
//    @GetMapping("/image/{id}")
//    public void downloadImage(HttpServletResponse response,
//            @PathVariable Long id) throws IOException {
//
//
//
//        byte[] imageData = imageService.downloadImage(id);
//
//        // Pobierz ContentType obrazu, na podstawie którego dodamy rozszerzenie pliku.
//        String contentType = "image/png";  // Domyślny Content-Type
//
//        // Tutaj możesz dodać logikę do określenia Content-Type na podstawie danych obrazu.
//
//        String fileExtension = contentType.equals("image/jpeg") ? "jpg" : "png"; // Przykład rozszerzenia.
//
//        response.setContentType("application/zip");
//        response.setHeader("Content-Disposition", "attachment;filename=Download." + fileExtension + ".zip"); // Ustaw nazwę pliku ZIP z odpowiednim rozszerzeniem.
//
//        ZipOutputStream outputStream = new ZipOutputStream(response.getOutputStream());
//        outputStream.putNextEntry(new ZipEntry("image." + fileExtension)); // Ustaw nazwę pliku wewnątrz ZIP z rozszerzeniem obrazu.
//        outputStream.write(imageData);
//        outputStream.closeEntry();
//
//        response.setStatus(HttpStatus.OK.value()); // 200
//        outputStream.finish();
//
//    }

//    @GetMapping("/image/{id}")
//    public ResponseEntity<?> downloadImage(@PathVariable Long id){
//
//        byte[] imageData = imageService.downloadImage(id);
//
//        return ResponseEntity.status(HttpStatus.OK)
//                .contentType(MediaType.valueOf("image/png"))
//                .body(imageData);
//    }
}
