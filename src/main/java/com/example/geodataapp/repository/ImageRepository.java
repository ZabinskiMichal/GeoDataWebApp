package com.example.geodataapp.repository;

import com.example.geodataapp.model.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<ImageData, Long> {

    Optional<ImageData> findById(Long id);


//    @Query("SELECT i FROM ImageData i WHERE i.point.appUser.id = :pointId")
    @Query("SELECT i FROM ImageData i WHERE i.point.id = :pointId")
    List<ImageData> findImagesByPointId(@Param("pointId") Long pointId);

    @Query("SELECT i.id FROM ImageData i WHERE i.point.id = :pointID")
    Optional<List<Long>> getImagesIdByPointId(@Param("pointID") Long pointID);

}
