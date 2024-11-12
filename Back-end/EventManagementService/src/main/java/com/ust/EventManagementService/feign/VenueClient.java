package com.ust.EventManagementService.feign;

import com.ust.EventManagementService.Client.Venue;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="VenueManagementService", url="http://localhost:9093")
public interface VenueClient {
    @GetMapping("/venue/event/{eventId}")
    Venue getVenueByEventId(@PathVariable Long eventId);

    @DeleteMapping("/venue/delete/{eventId}")
    ResponseEntity<Void> deleteVenueByEventId(@PathVariable Long eventId);
}
