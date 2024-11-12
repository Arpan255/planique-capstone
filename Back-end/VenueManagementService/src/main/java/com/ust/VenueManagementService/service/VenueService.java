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
    @Getter
    private final List<Venue> predefinedVenues = Arrays.asList(
            new Venue(1L, null, "Venue A", "Address A", "Owner A", "1234567890", "a@example.com", 5000.0, "Notes A"),
            new Venue(2L, null, "Venue B", "Address B", "Owner B", "0987654321", "b@example.com", 4000.0, "Notes B")
            // Add more predefined venues as needed
    );

    public Venue saveVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    public Venue getVenueByEventId(Long eventId) {
        return venueRepository.findByEventId(eventId);
    }

    public void deleteVenueByEventId(Long eventId) {
        venueRepository.deleteByEventId(eventId);
    }

}
