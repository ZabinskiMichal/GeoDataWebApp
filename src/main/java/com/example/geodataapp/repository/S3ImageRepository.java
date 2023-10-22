package com.example.geodataapp.repository;

import com.example.geodataapp.model.S3ImageData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface S3ImageRepository extends JpaRepository<S3ImageData, Long> {

}
