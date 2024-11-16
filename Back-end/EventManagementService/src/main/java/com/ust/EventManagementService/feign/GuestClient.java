package com.ust.EventManagementService.feign;

import com.ust.EventManagementService.Client.Guest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "GuestManagementService", url = "http://localhost:9092")
public interface GuestClient {

        @GetMapping("/api/guests/event/{eventId}")
        List<Guest> getGuestsByEventId(@PathVariable("eventId") String eventId);
    }
