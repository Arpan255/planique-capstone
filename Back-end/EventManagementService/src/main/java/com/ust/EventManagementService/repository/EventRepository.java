package com.ust.EventManagementService.repository;

import com.ust.EventManagementService.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByUsername(String username);
}
