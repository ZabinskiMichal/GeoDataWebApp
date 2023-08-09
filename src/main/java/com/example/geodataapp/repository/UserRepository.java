package com.example.geodataapp.repository;

import com.example.geodataapp.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);
    Boolean existsByEmail(String email);

    @Query("SELECT DISTINCT u.id FROM AppUser u WHERE u.email = :email")
    Optional<Long> findDistinctIdByEmail(@Param("email") String email);
}
