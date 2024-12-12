package com.ust.GuestManagementService.controller;

import com.ust.GuestManagementService.model.Guest;
import com.ust.GuestManagementService.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/addguests")
    public Guest addGuest(@RequestBody Guest guest) {
        return guestService.addGuest(guest);
    }

    @GetMapping("/event/{eventId}")
    public List<Guest> getGuestsByEventId(@PathVariable("eventId") String eventId) {
        return guestService.getGuestsByEventId(eventId);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Guest>> getAllGuests() {
        List<Guest> guests = guestService.getAllGuests();
        return ResponseEntity.ok(guests);
    }

    @PostMapping("/{guestId}/send-rsvp")
    public ResponseEntity<String> sendRsvpNotification(@PathVariable String guestId) {
        try {
            Guest guest = guestService.findById(guestId);
            if (guest == null) {
                return ResponseEntity.notFound().build();
            }

            // Send email notification
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(guest.getEmail());
            message.setSubject("RSVP Reminder");
            message.setText("Dear " + guest.getName() + ",\n\n" +
                    "Please RSVP for the upcoming event.\n\n" +
                    "Best regards");

            mailSender.send(message);

            // Update RSVP status
            guest.setRsvpStatus("SENT");
            guestService.updateGuest(guest);

            return ResponseEntity.ok("RSVP notification sent successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to send RSVP notification: " + e.getMessage());
        }
    }

    @GetMapping("/{guestId}")
    public ResponseEntity<Guest> getGuestById(@PathVariable String guestId) {
        Guest guest = guestService.findById(guestId);
        if (guest != null) {
            return ResponseEntity.ok(guest);
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/update/{guestId}")
    public ResponseEntity<Guest> updateGuest(@PathVariable String guestId, @RequestBody Guest updatedGuest) {
        Guest guest = guestService.findById(guestId);
        if (guest != null) {
            guest.setName(updatedGuest.getName());
            guest.setEmail(updatedGuest.getEmail());
            guest.setRsvpStatus(updatedGuest.getRsvpStatus());
            guest.setEventId(updatedGuest.getEventId());
            guestService.updateGuest(guest);
            return ResponseEntity.ok(guest);
        }
        return ResponseEntity.notFound().build();
    }
}