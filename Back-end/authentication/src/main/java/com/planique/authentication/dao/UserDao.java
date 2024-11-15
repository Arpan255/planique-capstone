package com.planique.authentication.dao;

import com.planique.authentication.entity.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserDao extends MongoRepository<Users,String> {
    Optional<Users> findByName(String username);
}
