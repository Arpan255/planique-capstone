package com.ust.GuestManagementService.repository;

import com.ust.GuestManagementService.model.Guest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface GuestRepository extends MongoRepository<Guest, Long> {
    List<Guest> findByEventRef(Long eventId);
}
