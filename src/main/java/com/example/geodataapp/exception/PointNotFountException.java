package com.example.geodataapp.exception;

public class PointNotFountException extends RuntimeException{

    private static final long serialVersionID = 1;

    public PointNotFountException(String message){
        super(message);
    }

}
