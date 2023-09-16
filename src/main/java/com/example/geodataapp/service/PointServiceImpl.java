package com.example.geodataapp.service;

import com.example.geodataapp.dto.PointDto;
import com.example.geodataapp.exception.PointNotFountException;
import com.example.geodataapp.model.AppUser;
import com.example.geodataapp.model.Point;
import com.example.geodataapp.repository.PointRepository;
import com.example.geodataapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.opencsv.CSVWriter;


import java.io.ByteArrayOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointServiceImpl implements PointService{

    private PointRepository pointRepository;
    private UserRepository userRepository;


    @Autowired
    public PointServiceImpl(PointRepository pointRepository, UserRepository userRepository) {
        this.pointRepository = pointRepository;
        this.userRepository = userRepository;
    }

    @Override
    public PointDto createPoint(long userId, PointDto pointDto) {

        Point point = mapToEntity(pointDto);

        AppUser appUser = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Could not find user with id: " + userId));

        point.setAppUser(appUser);

        Point newPoint = pointRepository.save(point);

        return mapToDto(newPoint);

    }

    @Override
    public List<PointDto> getAllPoints(long userId) {
        List<Point> points = pointRepository.findByAppUserId(userId);
        //collect po prostu zmienia na liste
        return points.stream().map(point -> mapToDto(point)).collect(Collectors.toList());
    }

    @Override
    public PointDto getPointById(long pointId, Long userId) {
        Point point = pointRepository.findById(pointId)
                .orElseThrow(() -> new PointNotFountException("Point with id : " + pointId + " not found"));

        List<Long> usersPoints = pointRepository.findPointIdsByAppUserId(userId);

        if(!usersPoints.contains(point.getId())){
//            dodac swoj wyjate
            throw new RuntimeException("Punkt o id: " + point.getId() + " nie należy do Ciebie!");
        }

        return mapToDto(point);
    }




    @Override
    public void deletePoint(long id, Long userId) {

        Point pointToDelete = pointRepository.findById(id)
                .orElseThrow(() -> new PointNotFountException("Point with id : " + id + " not found"));

        List<Long> usersPoints = pointRepository.findPointIdsByAppUserId(userId);

        if(!usersPoints.contains(pointToDelete.getId())){
//            dodac swoj wyjate
            throw new RuntimeException("Punkt o id: " + pointToDelete.getId() + " nie należy do Ciebie!");
        }

        pointRepository.delete(pointToDelete);
    }

    @Override
    public PointDto updatePoint(Long pointId, Long userId, PointDto pointDto) {

        Point pointToUpdate = getPointFromPointIf(pointId);

        List<Long> usersPoints = pointRepository.findPointIdsByAppUserId(userId);

        if(!usersPoints.contains(pointToUpdate.getId())){
//            dodac swoj wyjate
            throw new RuntimeException("Punkt o id: " + pointToUpdate.getId() + " nie należy do Ciebie!");
        }

        pointToUpdate.setTitle(pointDto.getTitle());
        pointToUpdate.setLongitude(pointDto.getLongitude());
        pointToUpdate.setLatitude(pointDto.getLatitude());
        pointToUpdate.setDescription(pointDto.getDescription());

        Point updatedPoint = pointRepository.save(pointToUpdate);

        return mapToDto(updatedPoint);
    }

    private Point getPointFromPointIf(Long pointId){
        return pointRepository.findById(pointId)
                .orElseThrow(() -> new PointNotFountException("Point with id : " + pointId + " not found"));
    }


    private PointDto mapToDto(Point point){
        PointDto pointDto = new PointDto();

        pointDto.setId(point.getId());
        pointDto.setTitle(point.getTitle());
        pointDto.setLongitude(point.getLongitude());
        pointDto.setLatitude(point.getLatitude());
        pointDto.setDescription(point.getDescription());
        pointDto.setCreatedAt(point.getCreatedAt());

        return pointDto;
    }

    private Point mapToEntity(PointDto pointDto){
        Point point = new Point();

        point.setId(pointDto.getId());
        point.setTitle(pointDto.getTitle());
        point.setLongitude(pointDto.getLongitude());
        point.setLatitude(pointDto.getLatitude());
        point.setDescription(pointDto.getDescription());
        point.setCreatedAt(LocalDateTime.now());

        return point;
    }



//    @Override
//    public void generateRaportToCsv(Long userId) throws IOException {
//        List<Point> points = pointRepository.findByAppUserId(userId);
//
//        LocalDate currentDate = LocalDate.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy_MM_dd");
//        String formattedDate = currentDate.format(formatter);
//
//        String createdPath = "/raport_" + formattedDate + ".csv";
//
//        try (CSVWriter writer = new CSVWriter(new FileWriter(createdPath))) {
//
//            String[] headers = {"id", "title", "lon", "lat", "description", };
//            writer.writeNext(headers);
//
//            for (Point entity : points) {
//                String[] rowData = {entity.getId().toString(),
//                        entity.getTitle(),
//                        entity.getLongitude().toString(),
//                        entity.getLatitude().toString(),
//                        entity.getDescription()
//                };
//                writer.writeNext(rowData);
//
//            }
//
//            System.out.println("Raport for user: " + userId + " generated");
//        }
//
//    }



    @Override
    public byte[] generateRaportToCsv(Long userId) throws IOException {
        List<Point> points = pointRepository.findByAppUserId(userId);

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy_MM_dd");
        String formattedDate = currentDate.format(formatter);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try (CSVWriter writer = new CSVWriter(new OutputStreamWriter(outputStream))) {

            String[] headers = {"id", "title", "lon", "lat", "description"};
            writer.writeNext(headers);

            for (Point entity : points) {
                String[] rowData = {
                        entity.getId().toString(),
                        entity.getTitle(),
                        entity.getLongitude().toString(),
                        entity.getLatitude().toString(),
                        entity.getDescription()
                };
                writer.writeNext(rowData);
            }

            System.out.println("Raport for user: " + userId + " generated");
        }

        return outputStream.toByteArray();
    }
}
