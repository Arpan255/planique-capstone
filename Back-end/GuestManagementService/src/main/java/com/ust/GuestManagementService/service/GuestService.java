package com.ust.GuestManagementService.service;

import com.ust.GuestManagementService.model.Guest;
import com.ust.GuestManagementService.repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {

    @Autowired
    private GuestRepository guestRepository;

    public List<Guest> getAllGuests() {
        return guestRepository.findAll();
    }

    public Guest createGuest(Guest guest) {
        guest.setRsvpStatus("NOT_SENT");
        return guestRepository.save(guest);
    }

//    public Guest updateGuest(String guestId, Guest guest) {
//        Guest existingGuest = findById(guestId);
//        existingGuest.setName(guest.getName());
//        existingGuest.setEmail(guest.getEmail());
//        existingGuest.setPhone(guest.getPhone());
//        existingGuest.setEventId(guest.getEventId());
//        return guestRepository.save(existingGuest);
//    }

    public void deleteGuest(String guestId) {
        guestRepository.deleteById(guestId);
    }

    public Guest findById(String guestId) {
        return guestRepository.findById(guestId)
                .orElseThrow(() -> new RuntimeException("Guest not found with id: " + guestId));
    }

    public Guest updateRsvpStatus(String guestId) {
        Guest guest = findById(guestId);
        guest.setRsvpStatus("SENT");
        return guestRepository.save(guest);
    }

    public Guest addGuest(Guest guest) {
        return guestRepository.save(guest);
    }

    public List<Guest> getGuestsByEventId(String eventId) {
        return guestRepository.findByEventId(eventId);
    }

    public void updateGuest(Guest guest) {
        guestRepository.save(guest);
    }
}