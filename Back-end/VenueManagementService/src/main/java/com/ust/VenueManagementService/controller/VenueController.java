package com.ust.VenueManagementService.controller;

import com.ust.VenueManagementService.model.Venue;
import com.ust.VenueManagementService.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/venue")
@CrossOrigin(origins = "http://localhost:5173")
public class VenueController {

    @Autowired
    private VenueService venueService;


    @PostMapping("/create")
    public ResponseEntity<Venue> createVenue(@RequestBody Venue venue) {
        Venue savedVenue = venueService.saveVenue(venue);
        return ResponseEntity.ok(savedVenue);
    }
    @GetMapping("/all")
    public List<Venue> getAllVenues() {
        return venueService.getAllVenues();
    }

    @PutMapping("/updateVenue/{eventId}")
    public ResponseEntity<Venue> updateVenue(@PathVariable String eventId, @RequestBody Venue updatedVenue) {
        Venue existingVenue = venueService.getVenueByEventId(eventId);

        if (existingVenue != null) {
            // Update the existing venue with the new data
            existingVenue.setName(updatedVenue.getName());
            existingVenue.setAddress(updatedVenue.getAddress());
            existingVenue.setOwner(updatedVenue.getOwner());
            existingVenue.setPhone(updatedVenue.getPhone());
            existingVenue.setEmail(updatedVenue.getEmail());
            existingVenue.setCost(updatedVenue.getCost());
            existingVenue.setNotes(updatedVenue.getNotes());

            // Save the updated venue
            Venue savedVenue = venueService.saveVenue(existingVenue);

            return ResponseEntity.ok(savedVenue);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/event/{eventId}")
    public Venue getVenueByEventId(@PathVariable String eventId) {
        return venueService.getVenueByEventId(eventId);
    }

    @GetMapping("/showVenueDetail")
    public ResponseEntity<Venue> showVenueDetail(@RequestParam String eventId) {
        Venue venue = venueService.getVenueByEventId(eventId);

        if (venue != null) {
            return ResponseEntity.ok(venue);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/delete/{eventId}")
    public ResponseEntity<Void> deleteVenueByEventId(@PathVariable String eventId) {
        venueService.deleteVenueByEventId(eventId);
        return ResponseEntity.noContent().build();
    }

}
