package com.example.geodataapp.dto;


import com.example.geodataapp.model.Role;
import lombok.Data;

import java.util.List;

@Data
public class AuthResponseDTO {

    private String accessToken;
//    private String tokenType = "Bearer ";
//    private List<Role> roles;
    private List<String> roles;


    public AuthResponseDTO(String accessToken, List<String> roles) {
        this.accessToken = accessToken;
        this.roles = roles;
    }

}
