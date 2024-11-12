package com.planique.vendor.repository;

import com.planique.vendor.entity.Vendor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VendorRepository extends MongoRepository<Vendor,Long> {
    List<Vendor> findByEventId(Long eventId);
}
