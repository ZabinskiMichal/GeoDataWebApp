package com.example.geodataapp.repository;

import com.example.geodataapp.model.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<ImageData, Long> {

    Optional<ImageData> findById(Long id);

}
