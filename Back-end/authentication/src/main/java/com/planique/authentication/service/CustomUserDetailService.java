package com.planique.authentication.service;

import com.planique.authentication.dao.UserDao;
import com.planique.authentication.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserDao userdao;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> user = userdao.findByName(username);
        System.out.println("user2: " + user.get());
        return user.map(CustomUserDetails::new).orElseThrow(()->new UsernameNotFoundException("Username/password "));
    }
}
