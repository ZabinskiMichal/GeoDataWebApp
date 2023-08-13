package com.example.geodataapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PointDto {

    private Long id;
    private String title;
    private Double longitude;
    private Double latitude;
    private String description;
    private LocalDateTime createdAt;

}


