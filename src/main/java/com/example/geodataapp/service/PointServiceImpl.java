package com.example.geodataapp.service;

import com.example.geodataapp.dto.PointDto;
import com.example.geodataapp.exception.PointNotFountException;
import com.example.geodataapp.model.Point;
import com.example.geodataapp.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointServiceImpl implements PointService{

    private PointRepository pointRepository;

    @Autowired
    public PointServiceImpl(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    @Override
    public PointDto createPoint(PointDto pointDto) {
        Point point = new Point();

        point.setTitle(pointDto.getTitle());
        point.setLongitude(pointDto.getLongitude());
        point.setLatitude(pointDto.getLatitude());
        point.setDescription(pointDto.getDescription());

        Point newPoint = pointRepository.save(point);

        PointDto pointResponse = new PointDto();

        pointResponse.setTitle(newPoint.getTitle());
        pointResponse.setLongitude(newPoint.getLongitude());
        pointResponse.setLatitude(newPoint.getLatitude());
        pointResponse.setDescription(newPoint.getDescription());

        return pointResponse;
    }

    @Override
    public List<PointDto> getAllPoints() {
        List<Point> points = pointRepository.findAll();


        //collect po prostu zmienia na liste
        return points.stream().map(point -> mapToDto(point)).collect(Collectors.toList());
    }


    @Override
    public void deletePoint(long id) {
        Point pointToDelete = pointRepository.findById(id)
                .orElseThrow(() -> new PointNotFountException("Point with id : " + id + " not found"));
        pointRepository.delete(pointToDelete);
    }

    private PointDto mapToDto(Point point){
        PointDto pointDto = new PointDto();

        pointDto.setId(point.getId());
        pointDto.setTitle(point.getTitle());
        pointDto.setLongitude(point.getLongitude());
        pointDto.setLatitude(point.getLatitude());
        pointDto.setDescription(point.getDescription());

        return pointDto;
    }

    private Point mapToEntity(PointDto pointDto){
        Point point = new Point();

        point.setId(pointDto.getId());
        point.setTitle(pointDto.getTitle());
        point.setLongitude(pointDto.getLongitude());
        point.setLatitude(pointDto.getLatitude());
        point.setDescription(pointDto.getDescription());

        return point;
    }
}
