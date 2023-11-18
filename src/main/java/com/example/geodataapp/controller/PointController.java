package com.example.geodataapp.controller;

import com.example.geodataapp.dto.PointDto;
import com.example.geodataapp.security.JWTAuthenticationFilter;
import com.example.geodataapp.service.ImageServiceImpl;
import com.example.geodataapp.service.PointServiceImpl;
import com.example.geodataapp.service.S3ImageServiceImpl;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/geodataapp/points")
@CrossOrigin(origins = "http://localhost:3000")
public class PointController {

    private PointServiceImpl pointService;
    private JWTAuthenticationFilter jwtAuthenticationFilter;
    private ImageServiceImpl imageService;
    private S3ImageServiceImpl s3ImageService;


    public PointController(PointServiceImpl pointService,
                           JWTAuthenticationFilter jwtAuthenticationFilter,
                           ImageServiceImpl imageService,
                           S3ImageServiceImpl s3ImageService) {
        this.pointService = pointService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.imageService = imageService;
        this.s3ImageService = s3ImageService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<PointDto>> getPoints(){
        return new ResponseEntity<>(pointService.getAllPoints(jwtAuthenticationFilter.getUserId()), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<PointDto> getPointById(@PathVariable("id") long id){
        return new ResponseEntity<>(pointService.getPointById(id, jwtAuthenticationFilter.getUserId()), HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<PointDto> createPoint(@RequestBody PointDto pointDto){
        return new ResponseEntity<>(pointService.createPoint(jwtAuthenticationFilter.getUserId(), pointDto), HttpStatus.OK);
    }



    //To DB
    @PostMapping("/create-with-images")
    public ResponseEntity<PointDto> createPointWithImagesAndSaveToDB(
            @ModelAttribute PointDto pointDto,
            @RequestParam("image") List<MultipartFile> files) throws IOException {

        PointDto createdPoint = pointService.createPoint(jwtAuthenticationFilter.getUserId(), pointDto);

        Long pointId = createdPoint.getId();

        imageService.uploadImage(files, pointId);

        return new ResponseEntity<>(createdPoint, HttpStatus.OK);
    }

//    //To S3
//    @PostMapping("/create-with-images")
//    public ResponseEntity<PointDto> createPointWithImagesAndSaveToS3(
//            @ModelAttribute PointDto pointDto,
//            @RequestParam("image") List<MultipartFile> files) throws IOException {
//
//        PointDto createdPoint = pointService.createPoint(jwtAuthenticationFilter.getUserId(), pointDto);
//
//        Long pointId = createdPoint.getId();
//
//        s3ImageService.uploadFile(files, pointId);
//
//        return new ResponseEntity<>(createdPoint, HttpStatus.OK);
//    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePoint(@PathVariable("id") long pointId){
        pointService.deletePoint(pointId, jwtAuthenticationFilter.getUserId());
        return new ResponseEntity<>("Point with id:" + pointId + " deleted successfully!", HttpStatus.OK);
    }


    @GetMapping("/generateraport")
    public ResponseEntity<ByteArrayResource> generateRaport() throws IOException {
        Long userId = jwtAuthenticationFilter.getUserId();

        byte[] raportBytes = pointService.generateRaportToCsv(userId);

        ByteArrayResource resource = new ByteArrayResource(raportBytes);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentLength(raportBytes.length);
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "raport.csv");

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PointDto> updatePoint(@PathVariable(value = "id") Long pointId,
                                                @RequestBody PointDto pointDto){
        PointDto updatedPoint = pointService.updatePoint(pointId, jwtAuthenticationFilter.getUserId(), pointDto);
        return new ResponseEntity<>(updatedPoint, HttpStatus.OK);
    }

}
