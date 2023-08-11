package com.example.geodataapp.repository;


import com.example.geodataapp.model.AppUser;
import com.example.geodataapp.model.Point;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class PointRepositoryTest {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;


    @Test
    public void PointRepository_SaveAll_ReturnPoint(){

        //given

        Point testPoint = Point.builder()
                .title("Test point")
                .longitude(10d)
                .latitude(20d)
                .description("test point description")
                .build();


        //when

        Point savedPoint = pointRepository.save(testPoint);


        //then

        Assertions.assertThat(savedPoint).isNotNull();
        Assertions.assertThat(savedPoint.getId()).isGreaterThan(0);
    }

    @Test
    public void PointRepository_FindByAppUserId(){

        AppUser user1 = AppUser.builder()
                .firstname("Mike")
                .lastname("Smith")
                .email("email1@email.com")
                .password("password")
                .build();

        userRepository.save(user1);

        Point testPoint1 = Point.builder()
                .title("Test point")
                .longitude(10d)
                .latitude(20d)
                .description("test point description")
                .appUser(user1)
                .build();

        Point testPoint2 = Point.builder()
                .title("Test point")
                .longitude(10d)
                .latitude(20d)
                .description("test point description")
                .appUser(user1)
                .build();

        pointRepository.save(testPoint1);
        pointRepository.save(testPoint2);


        List<Point> foundPoints = pointRepository.findByAppUserId(user1.getId());

        Assertions.assertThat(foundPoints).isNotNull();
        Assertions.assertThat(foundPoints).isEqualTo(List.of(testPoint1, testPoint2));
    }

    @Test
    public void PointRepository_FindPointsIdsByAppUserId(){

        AppUser user1 = AppUser.builder()
                .firstname("Mike")
                .lastname("Smith")
                .email("email1@email.com")
                .password("password")
                .build();

        userRepository.save(user1);

        Point testPoint1 = Point.builder()
                .title("Test point")
                .longitude(10d)
                .latitude(20d)
                .description("test point description")
                .appUser(user1)
                .build();

        Point testPoint2 = Point.builder()
                .title("Test point")
                .longitude(10d)
                .latitude(20d)
                .description("test point description")
                .appUser(user1)
                .build();

        pointRepository.save(testPoint1);
        pointRepository.save(testPoint2);

        List<Long> foundIds = pointRepository.findPointIdsByAppUserId(user1.getId());

        Assertions.assertThat(foundIds).isNotNull();
        Assertions.assertThat(foundIds).isEqualTo(List.of(1L, 2L));
    }

    @Test
    public void PointRepository_DeletePoint(){

        Point testPoint1 = Point.builder()
                .title("Test point")
                .longitude(10d)
                .latitude(20d)
                .description("test point description")
                .build();


        pointRepository.save(testPoint1);

        pointRepository.delete(testPoint1);

        Optional<Point> returnedPoint = pointRepository.findById(testPoint1.getId());

        Assertions.assertThat(returnedPoint).isEmpty();
    }

    // TODO: deleting point that do not belong to user is not allowed - but test it in point service not repo

}
