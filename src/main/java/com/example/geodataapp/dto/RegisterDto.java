package com.example.geodataapp.dto;

import lombok.Data;

@Data
public class RegisterDto {

    private String firstname;
    protected String lastname;
    private String email;
    private String password;

}
