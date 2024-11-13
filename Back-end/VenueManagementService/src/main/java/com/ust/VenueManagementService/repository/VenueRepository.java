package com.ust.VenueManagementService.repository;

import com.ust.VenueManagementService.model.Venue;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VenueRepository extends MongoRepository<Venue,String> {
    Venue findByEventId(String eventId);
    void deleteByEventId(String eventId);
}
