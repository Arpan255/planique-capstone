package com.ust.EventManagementService.feign;

import com.ust.EventManagementService.Client.Vendor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="vendor", url = "http://localhost:9092")
public interface VendorClient {
    @GetMapping("/api/vendors/vendors/{eventId}")
    List<Vendor> getVendorsByEventId(@PathVariable String eventId);
}
