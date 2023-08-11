package com.example.geodataapp.repository;


import com.example.geodataapp.model.AppUser;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void UserRepository_SaveAll_ReturnUser(){

        //given
        AppUser user = AppUser.builder()
                .firstname("Mike")
                .lastname("Smith")
                .email("email@email.com")
                .password("password")
                .build();

        //when

        AppUser userSaved = userRepository.save(user);

        //then

        Assertions.assertThat(userSaved).isNotNull();
        Assertions.assertThat(userSaved.getId()).isGreaterThan(0);



    }
}
