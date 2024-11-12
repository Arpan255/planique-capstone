package com.ust.EventManagementService.Client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Venue {
    private Long venueId;
    private Long eventId;
    private String name;
    private String address;
    private String owner;
    private String phone;
    private String email;
    private Double cost;
    private String notes;
}
