package com.ust.EventManagementService.repository;

import com.ust.EventManagementService.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

//@Repository
public interface EventRepository extends MongoRepository<Event, Long> {
}
