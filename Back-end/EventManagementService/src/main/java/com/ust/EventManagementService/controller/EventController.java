package com.ust.EventManagementService.controller;

import com.ust.EventManagementService.Client.Expenses;
import com.ust.EventManagementService.Client.Guest;
import com.ust.EventManagementService.Client.Vendor;
import com.ust.EventManagementService.Client.Venue;
import com.ust.EventManagementService.model.Event;
import com.ust.EventManagementService.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping("/create")
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @GetMapping("/showEvents")
    public ResponseEntity<List<Event>> showAllEvents() {
        List<Event> events = eventService.showAllEvents();
        return ResponseEntity.ok(events);
    }
    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable String eventId) {
        Event event = eventService.getEventById(eventId);
        return ResponseEntity.ok(event);
    }
    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String eventId) {
        Event event = eventService.getEventById(eventId);
        if (event != null) {
            eventService.deleteEvent(eventId);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{eventId}/guests")
    public ResponseEntity<List<Guest>> getGuestListByEvent(@PathVariable String eventId) {
        List<Guest> guests = eventService.getGuestListByEvent(eventId);
        return ResponseEntity.ok(guests);
    }

    @GetMapping("/vendors/{eventId}")
    public ResponseEntity<List<Vendor>> getVendorsByEventId(@PathVariable String eventId){
        List<Vendor> vendors = eventService.getVendorsByEventId(eventId);
        return ResponseEntity.ok(vendors);
    }

    @GetMapping("/event/{eventId}")
    public Venue getVenueByEventId(@PathVariable String eventId) {
        return eventService.getVenueByEventId(eventId);
    }

    @DeleteMapping("/delete/{eventId}")
    public ResponseEntity<Void> deleteVenueByEventId(@PathVariable String eventId) {
        eventService.deleteVenueByEventId(eventId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/events/{eventId}")
    public List<Expenses> getExpensesByEvent(@PathVariable String eventId) {
        return eventService.getExpensesByEvent(eventId);
    }

    @GetMapping("/showEvents/{username}")
    public ResponseEntity<List<Event>> getEventsByUsername(@PathVariable String username) {
        List<Event> events = eventService.getEventsByUsername(username);
        return ResponseEntity.ok(events);
    }

}
