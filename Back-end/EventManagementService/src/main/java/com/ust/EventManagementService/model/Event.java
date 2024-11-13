package com.ust.EventManagementService.model;

//import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

//@Entity
@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
//@Table(name="event")
public class Event {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String eventId;
    private String username;
    private String name;
    private String description;
    private Date date;
    private String type;
    private Long budget;
    private String status;
    private String googleCalendarEventId;
}
