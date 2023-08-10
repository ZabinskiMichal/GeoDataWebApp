package com.example.geodataapp.service;

import com.example.geodataapp.dto.PointDto;

import java.util.List;

public interface PointService {

    PointDto createPoint(long userId, PointDto pointDto);

    List<PointDto> getAllPoints(long userId);

    void deletePoint(long id, Long userId);
}
