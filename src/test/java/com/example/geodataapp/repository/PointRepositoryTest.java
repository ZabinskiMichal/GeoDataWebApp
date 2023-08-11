package com.example.geodataapp.repository;


import com.example.geodataapp.model.Point;
import org.junit.jupiter.api.Test;
import org.assertj.core.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class PointRepositoryTest {

    @Autowired
    private PointRepository pointRepository;


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
}
