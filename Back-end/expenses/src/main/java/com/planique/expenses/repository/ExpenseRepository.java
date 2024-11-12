package com.planique.expenses.repository;

import com.planique.expenses.entity.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExpenseRepository extends MongoRepository<Expense,Long> {
    List<Expense> findByEventId(Long eventId);
    List<Expense> findByVendorId(Long vendorId);
    List<Expense> findByExpenseCategory(String expenseCategory);
    List<Expense> findByPaymentStatus(String paymentStatus);
    Expense findByInvoiceNumber(String invoiceNumber);
}
