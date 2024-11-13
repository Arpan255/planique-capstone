package com.ust.VenueManagementService.service;

import com.ust.VenueManagementService.model.Venue;
import com.ust.VenueManagementService.repository.VenueRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class VenueService {
    @Autowired
    private VenueRepository venueRepository;


    // Predefined venues

    public Venue saveVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    public Venue getVenueByEventId(String eventId) {
        return venueRepository.findByEventId(eventId);
    }

    public void deleteVenueByEventId(String eventId) {
        venueRepository.deleteByEventId(eventId);
    }

}
