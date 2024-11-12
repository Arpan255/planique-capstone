package com.ust.EventManagementService.service;

import com.ust.EventManagementService.Client.Expenses;
import com.ust.EventManagementService.Client.Guest;
import com.ust.EventManagementService.Client.Vendor;
import com.ust.EventManagementService.Client.Venue;
import com.ust.EventManagementService.feign.ExpensesClient;
import com.ust.EventManagementService.feign.GuestClient;
import com.ust.EventManagementService.feign.VendorClient;
import com.ust.EventManagementService.feign.VenueClient;
import com.ust.EventManagementService.model.Event;
import com.ust.EventManagementService.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private GuestClient guestClient;

    @Autowired
    private VendorClient vendorClient;

    @Autowired
    private VenueClient venueClient;

    @Autowired
    private ExpensesClient expensesClient;

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> showAllEvents() {
        return eventRepository.findAll();
    }

    public List<Guest> getGuestListByEvent(Long eventId) {
        return guestClient.getGuestsByEventId(eventId);
    }

    public List<Vendor> getVendorsByEventId(Long eventId){
        return vendorClient.getVendorsByEventId(eventId);
    }

    public Venue getVenueByEventId(Long eventId) { return venueClient.getVenueByEventId(eventId); }

    public void deleteVenueByEventId(Long eventId) {
        venueClient.deleteVenueByEventId(eventId);
    }

    public List<Expenses> getExpensesByEvent(Long eventId) {
        return expensesClient.getExpensesByEvent(eventId);
    }

}
