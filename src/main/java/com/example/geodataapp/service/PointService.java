package com.example.geodataapp.service;

import com.example.geodataapp.dto.PointDto;
import com.example.geodataapp.model.Point;

import java.io.IOException;
import java.util.List;

public interface PointService {

    PointDto createPoint(long userId, PointDto pointDto);

    PointDto updatePoint(Long pointId, Long userId, PointDto pointDto);

    List<PointDto> getAllPoints(long userId);

    void deletePoint(long id, Long userId);

    void generateRaportToCsv(String path, Long userId) throws IOException;
//    void generateRaportToCsv(Long userId) throws IOException;

    PointDto getPointById(long pointId, Long userId);


}
