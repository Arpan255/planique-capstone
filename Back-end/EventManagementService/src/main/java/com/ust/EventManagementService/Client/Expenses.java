package com.ust.EventManagementService.Client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Expenses {
    private String expenseId;
    private String eventId;
    private String vendorId;
    private String expenseDescription;
    private double TotalAmount;
    private LocalDate expenseDate;
    private String expenseCategory;
    private String expensePaymentMethod;
    private String paymentStatus;
    private String invoiceNumber;
}
