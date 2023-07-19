package com.example.geodataapp.controller;

import com.example.geodataapp.dto.AuthResponseDTO;
import com.example.geodataapp.dto.LoginDto;
import com.example.geodataapp.dto.RegisterDto;
import com.example.geodataapp.model.AppUser;
import com.example.geodataapp.model.Role;
import com.example.geodataapp.repository.RoleRepository;
import com.example.geodataapp.repository.UserRepository;
import com.example.geodataapp.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/geodataapp/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder,
                          JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){

        if(userRepository.existsByEmail(registerDto.getEmail())){
            return new ResponseEntity<>(registerDto + " email is taken", HttpStatus.BAD_REQUEST);
        }

        AppUser user = new AppUser();

        user.setFirstname(registerDto.getFirstname());
        user.setLastname(registerDto.getLastname());
        user.setEmail(registerDto.getEmail());

        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));



        //narazie kazdy bedzie userem
        //kazda rola musi byc najpierw dostępna w tabeli roles
        Role roles = roleRepository.findByName("USER").get();

//        user.setRoles(Collections.singletonList(roles));
        user.setRoles(List.of(roles));

        userRepository.save(user);

        return new ResponseEntity<>(registerDto.getEmail() + " registered successfully", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);

        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }
}
