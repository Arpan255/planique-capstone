package com.ust.EventManagementService.Client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Guest {
    private Long id;
    private String name;
    private String email;
    private String rsvpStatus;
    private String phone;
    private Long eventRef;

}

