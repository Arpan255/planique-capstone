package com.ust.GuestManagementService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
//@Table(name = "guest")
public class Guest {
    @Id
    private Long id;
    private String name;
    private String email;
    private String rsvpStatus;
    private String phone;
    private Long eventRef;
}
