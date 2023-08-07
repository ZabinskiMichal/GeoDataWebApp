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

    @GetMapping("/all")
    public ResponseEntity<List<PointDto>> getPoints(){
        return new ResponseEntity<>(pointService.getAllPoints(7), HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<PointDto> createPoint(@RequestBody PointDto pointDto){
        return new ResponseEntity<>(pointService.createPoint(7, pointDto), HttpStatus.OK);
    }

//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> deletePoint(@PathVariable("id") long pointId){
//        pointService.deletePoint(pointId);
//        return new ResponseEntity<>("Point with id:" + pointId + " deleted successfully!", HttpStatus.OK);
//    }


}
