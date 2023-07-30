package com.example.geodataapp.service;

import com.example.geodataapp.dto.PointDto;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

public interface PointService {

    PointDto createPoint(PointDto pointDto);

    List<PointDto> getAllPoints();
    void deletePoint(long id);
}
