package com.ust.GuestManagementService.repository;

import com.ust.GuestManagementService.model.Guest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GuestRepository extends MongoRepository<Guest, String> {
    List<Guest> findByEventId(String eventId);
}
