package com.planique.authentication.service;

import com.planique.authentication.dao.UserDao;
import com.planique.authentication.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userdao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public Users register(Users user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userdao.save(user);
    }

    public boolean verifyToken(String token) {
        jwtService.validateToken(token);
        return true;
    }

    public String generateToken(String token){
        return jwtService.generateToken(token);
    }
}
