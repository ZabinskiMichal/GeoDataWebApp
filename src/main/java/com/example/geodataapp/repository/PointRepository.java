package com.example.geodataapp.repository;

import com.example.geodataapp.model.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, Long> {
}
