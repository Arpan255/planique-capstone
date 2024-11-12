package com.ust.EventManagementService.Client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Vendor {
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
