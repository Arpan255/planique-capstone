package com.planique.authentication.controller;

import com.planique.authentication.entity.Users;
import com.planique.authentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public Users register(@RequestBody Users user) {
        return userService.register(user);
    }

    @GetMapping("/token")
    public boolean validateToken(@RequestParam String token){
        return userService.verifyToken(token);
    }

    @PostMapping("/validate/user")
    public String getToken(@RequestBody Users user){
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getName(),user.getPassword()));
        //System.out.println("user validated: " + authentication.isAuthenticated() );
        if(authentication.isAuthenticated()){
            return userService.generateToken(user.getName());
        }
        return null;
    }
}
