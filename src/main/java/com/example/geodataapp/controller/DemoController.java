package com.example.geodataapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/geodataapp/demo")
public class DemoController {

    @GetMapping
    public ResponseEntity<String> sayHello(){
        return  ResponseEntity.ok("test zabezpiecoznego endpointa");
    }
}
