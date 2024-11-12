package com.planique.expenses.service;

import com.planique.expenses.entity.Expense;
import com.planique.expenses.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private InvoiceGeneratorService invoiceGeneratorService;

    public Expense createExpense(Expense expense) {
        expense.setExpenseDate(LocalDate.now());
        Expense savedExpense = expenseRepository.save(expense);
        return expenseRepository.save(savedExpense);
    }
    public List<Expense> getExpensesByEvent(Long eventId) {
        return expenseRepository.findByEventId(eventId);
    }

    public List<Expense> getExpensesByVendor(Long vendorId) {
        return expenseRepository.findByVendorId(vendorId);
    }

    public List<Expense> getExpensesByCategory(String expenseCategory) {
        return expenseRepository.findByExpenseCategory(expenseCategory);
    }

    public List<Expense> getExpensesByPaymentStatus(String status) {
        return expenseRepository.findByPaymentStatus(status);
    }

    public Double getAmountByInvoiceNumber(String invoiceNumber) {
        Expense expense = expenseRepository.findByInvoiceNumber(invoiceNumber);
        return expense != null ? expense.getTotalAmount() : 0.0;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
}
