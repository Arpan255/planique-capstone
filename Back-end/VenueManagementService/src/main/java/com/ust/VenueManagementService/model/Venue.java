package com.ust.VenueManagementService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Venue {
    @Id
    private String venueId;
    private String eventId;
    private String name;
    private String address;
    private String owner;
    private String phone;
    private String email;
    private Double cost;
    private String notes;

}
