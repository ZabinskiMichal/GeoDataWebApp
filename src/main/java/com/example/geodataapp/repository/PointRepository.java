package com.example.geodataapp.repository;

import com.example.geodataapp.model.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findByAppUserId(long appUserId);
}
