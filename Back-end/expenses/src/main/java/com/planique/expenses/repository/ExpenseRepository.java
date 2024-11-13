package com.planique.expenses.repository;

import com.planique.expenses.entity.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExpenseRepository extends MongoRepository<Expense,String> {
    List<Expense> findByEventId(String eventId);
    List<Expense> findByVendorId(String vendorId);
    List<Expense> findByExpenseCategory(String expenseCategory);
    List<Expense> findByPaymentStatus(String paymentStatus);
    Expense findByInvoiceNumber(String invoiceNumber);
}
