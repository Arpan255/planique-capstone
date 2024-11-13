package com.ust.GuestManagementService.controller;

import com.ust.GuestManagementService.model.Guest;
import com.ust.GuestManagementService.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
@CrossOrigin(origins = "http://localhost:5173")
public class GuestController {
    @Autowired
    private GuestService guestService;

    @PostMapping("/addguests")
    public Guest addGuest(@RequestBody Guest guest) {
        return guestService.addGuest(guest);
    }

    @GetMapping("/event/{eventId}")
    public List<Guest> getGuestsByEventId(@PathVariable("eventId") String eventId) {
        return guestService.getGuestsByEventId(eventId);
    }
}
