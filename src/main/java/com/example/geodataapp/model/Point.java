package com.example.geodataapp.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Double longitude;
    private Double latitude;
    private String description;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appuser_id")
    private AppUser appUser;

}
