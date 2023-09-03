package com.example.geodataapp.controller;

import com.example.geodataapp.dto.PointDto;
import com.example.geodataapp.model.Path;
import com.example.geodataapp.security.JWTAuthenticationFilter;
import com.example.geodataapp.service.PointServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/geodataapp/points")
@CrossOrigin(origins = "http://localhost:3000")
public class PointController {

    private PointServiceImpl pointService;

    private JWTAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    public PointController(PointServiceImpl pointService,
                           JWTAuthenticationFilter jwtAuthenticationFilter) {
        this.pointService = pointService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
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


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePoint(@PathVariable("id") long pointId){
        pointService.deletePoint(pointId, jwtAuthenticationFilter.getUserId());
        return new ResponseEntity<>("Point with id:" + pointId + " deleted successfully!", HttpStatus.OK);
    }


    @PostMapping("/generateraport")
    public ResponseEntity<String> generateRaport(@RequestBody Path path) throws IOException {
        Long userId = jwtAuthenticationFilter.getUserId();
        pointService.generateRaportToCsv(path.getPath(), userId);
        return new ResponseEntity<>("Raport generated for user with id: " + userId, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PointDto> updatePoint(@PathVariable(value = "id") Long pointId,
                                                @RequestBody PointDto pointDto){
        PointDto updatedPoint = pointService.updatePoint(pointId, jwtAuthenticationFilter.getUserId(), pointDto);
        return new ResponseEntity<>(updatedPoint, HttpStatus.OK);
    }

}
