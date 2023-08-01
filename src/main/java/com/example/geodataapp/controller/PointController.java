package com.example.geodataapp.controller;

import com.example.geodataapp.dto.PointDto;
import com.example.geodataapp.service.PointServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("geodataapp/points")
@CrossOrigin(origins = "http://localhost:3000")
public class PointController {


    private PointServiceImpl pointService;

    @Autowired
    public PointController(PointServiceImpl pointService) {
        this.pointService = pointService;
    }

    @GetMapping("/{userId}/all")
    public ResponseEntity<List<PointDto>> getPoints(
            @PathVariable(value = "userId") long userId){
        return new ResponseEntity<>(pointService.getAllPoints(userId), HttpStatus.OK);
    }


    @PostMapping("/{userId}/create")
    public ResponseEntity<PointDto> createPoint(
            @PathVariable(value = "userId") long userId,
            @RequestBody PointDto pointDto){
        return new ResponseEntity<>(pointService.createPoint(userId, pointDto), HttpStatus.OK);
    }

//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> deletePoint(@PathVariable("id") long pointId){
//        pointService.deletePoint(pointId);
//        return new ResponseEntity<>("Point with id:" + pointId + " deleted successfully!", HttpStatus.OK);
//    }


}
