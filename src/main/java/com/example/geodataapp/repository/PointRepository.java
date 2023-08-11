package com.example.geodataapp.repository;

import com.example.geodataapp.model.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findByAppUserId(long appUserId);

    //poniewaz appuser_id jest kluczem obcym, trzeba jeszcze dodac id
    @Query("SELECT p.id FROM Point p WHERE p.appUser.id = :userId")
    List<Long> findPointIdsByAppUserId(@Param("userId") Long userId);


}
