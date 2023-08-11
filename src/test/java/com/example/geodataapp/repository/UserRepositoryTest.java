package com.example.geodataapp.repository;


import com.example.geodataapp.model.AppUser;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;
import java.util.OptionalLong;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void UserRepository_SaveAll_ReturnUser(){

        AppUser user = AppUser.builder()
                .firstname("Mike")
                .lastname("Smith")
                .email("email@email.com")
                .password("password")
                .build();

        AppUser userSaved = userRepository.save(user);

        Assertions.assertThat(userSaved).isNotNull();
        Assertions.assertThat(userSaved.getId()).isGreaterThan(0);
    }

    @Test
    public void UserRepository_FindByEmail_ReturnNotNull(){

        AppUser user = AppUser.builder()
                .firstname("Mike")
                .lastname("Smith")
                .email("email@email.com")
                .password("password")
                .build();

        userRepository.save(user);
        AppUser foundUser = userRepository.findByEmail(user.getEmail()).get();

        Assertions.assertThat(foundUser).isNotNull();
    }

    @Test
    public void UserRepository_ExistsByEmail_ReturnTrueIfUserExists(){

        AppUser user = AppUser.builder()
                .firstname("Mike")
                .lastname("Smith")
                .email("email@email.com")
                .password("password")
                .build();


        userRepository.save(user);
        Boolean doesUserExists = userRepository.existsByEmail(user.getEmail());


        Assertions.assertThat(doesUserExists).isTrue();

    }

    @Test
    public void UserRepository_ExistsByEmail_ReturnFalseIfUserDoesNotExists(){

        AppUser user = AppUser.builder()
                .firstname("Mike")
                .lastname("Smith")
                .email("email@email.com")
                .password("password")
                .build();


        userRepository.save(user);
        Boolean doesUserExists = userRepository.existsByEmail("email1@email.com");


        Assertions.assertThat(doesUserExists).isFalse();
    }

    @Test
    public void UserRepository_FindDistinctIdByEmail_IfUserExists_ReturnId(){

        AppUser user = AppUser.builder()
                .firstname("Mike")
                .lastname("Smith")
                .email("email@email.com")
                .password("password")
                .build();

        userRepository.save(user);
        Optional<Long> foundId = userRepository.findDistinctIdByEmail(user.getEmail());


        Assertions.assertThat(foundId.get()).isNotNull();
        Assertions.assertThat(foundId.get()).isEqualTo(1);


    }

    @Test
    public void UserRepository_FindDistinctIdByEmail_IfUserDoesNotExists_ReturnNull(){

        AppUser user = AppUser.builder()
                .firstname("Mike")
                .lastname("Smith")
                .email("email@email.com")
                .password("password")
                .build();

        userRepository.save(user);
        Optional<Long> foundId = userRepository.findDistinctIdByEmail("different@email.com");

        Assertions.assertThat(foundId).isEmpty();
    }


}
