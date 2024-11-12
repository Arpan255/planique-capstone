package com.planique.vendor.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Vendor {
    @Id
    private long vendorId;
    private long eventId;
    private String vendorCompanyName;
    private String vendorServiceType;
    private String vendorName;
    private String vendorPhone;
    private String vendorEmail;
    private double vendorAmount;
    private String vendorPaymentStatus;
}

