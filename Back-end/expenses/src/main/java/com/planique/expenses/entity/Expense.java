package com.planique.expenses.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class Expense {
    @Id
    private String expenseId;
    @NotBlank
    private String eventId;
    @NotBlank
    private String vendorId;
    private String expenseDescription;
    private double TotalAmount;
    private LocalDate expenseDate;
    private String expenseCategory;
    private String expensePaymentMethod;
    private String paymentStatus;
    private String invoiceNumber;
}
