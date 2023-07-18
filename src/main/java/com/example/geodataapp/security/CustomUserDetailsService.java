package com.example.geodataapp.security;

import com.example.geodataapp.model.AppUser;
import com.example.geodataapp.model.Role;
import com.example.geodataapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


//ta klasa jest odpowiedzilana za przydzielanie roli dla danego usera

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException(username + " not found"));

        System.out.println(user.toString());

        System.out.println("rola usera: " + user.getRoles());

        return new User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
    }
    //sprawdzic jeszcze klase roles i relacje z userem

    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles){
        List<GrantedAuthority> collect = roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
//        System.out.println("role: " + collect);
        return collect;

    }
}
