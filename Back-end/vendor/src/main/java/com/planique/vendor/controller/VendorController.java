package com.planique.vendor.controller;

import com.planique.vendor.entity.Vendor;
import com.planique.vendor.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = "http://localhost:5173")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @PostMapping("/add")
    public ResponseEntity<Vendor> addVendor(@RequestBody Vendor vendor){
        Vendor createdVendor = vendorService.addVendor(vendor);
        return ResponseEntity.ok(createdVendor);
    }

    @GetMapping("/vendors/{eventId}")
    public ResponseEntity<List<Vendor>> getVendorsByEventId(@PathVariable String eventId){
        List<Vendor> vendors = vendorService.getVendorsByEventId(eventId);
        return ResponseEntity.ok(vendors);
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<Vendor> getVendorByVendorId(@PathVariable String vendorId){
        Optional<Vendor> vendor = vendorService.getVendorById(vendorId);
        return vendor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{vendorId}")
    public ResponseEntity<Vendor> updateVendor(@PathVariable String vendorId, @RequestBody Vendor updatedVendor){
        Vendor vendor = vendorService.updateVendor(vendorId,updatedVendor);
        return vendor != null ? ResponseEntity.ok(vendor) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{vendorId}")
    public ResponseEntity<Void> deleteVendor(@PathVariable String vendorId){
        vendorService.deleteVendor(vendorId);
        return ResponseEntity.noContent().build();
    }

}
