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

    public Guest addGuest(Guest guest) {
        return guestRepository.save(guest);
    }

    public List<Guest> getGuestsByEventId(String eventId) {
        return guestRepository.findByEventId(eventId);
    }
}
