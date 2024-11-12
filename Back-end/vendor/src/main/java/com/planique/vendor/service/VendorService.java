package com.planique.vendor.service;

import com.planique.vendor.entity.Vendor;
import com.planique.vendor.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    public Vendor addVendor(Vendor vendor){
        return vendorRepository.save(vendor);
    }

    public List<Vendor> getVendorsByEventId(Long eventId){
        return vendorRepository.findByEventId(eventId);
    }

    public Optional<Vendor> getVendorById(Long vendorId){
        return vendorRepository.findById(vendorId);
    }

    public Vendor updateVendor(Long vendorId, Vendor updatedVendor){
        Optional<Vendor> existingVendor = vendorRepository.findById(vendorId);
        if(existingVendor.isPresent()){
            Vendor vendor = existingVendor.get();
            vendor.setVendorCompanyName(updatedVendor.getVendorCompanyName());
            vendor.setVendorServiceType(updatedVendor.getVendorServiceType());
            vendor.setVendorName(updatedVendor.getVendorName());
            vendor.setVendorEmail(updatedVendor.getVendorEmail());
            vendor.setVendorPhone(updatedVendor.getVendorPhone());
            vendor.setVendorAmount(updatedVendor.getVendorAmount());
            vendor.setVendorPaymentStatus(updatedVendor.getVendorPaymentStatus());
            return vendorRepository.save(vendor);
        }
        return null;
    }

    public void deleteVendor(Long vendorId){
        vendorRepository.deleteById(vendorId);
    }
}
