package com.planique.expenses.controller;

import com.planique.expenses.entity.Expense;
import com.planique.expenses.service.ExpenseService;
import com.planique.expenses.service.InvoiceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
//@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private InvoiceGeneratorService invoiceGeneratorService;

    @PostMapping("/create")
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseService.createExpense(expense);
    }

    @GetMapping("/events/{eventId}")
    public List<Expense> getExpensesByEvent(@PathVariable String eventId) {
        return expenseService.getExpensesByEvent(eventId);
    }

    @GetMapping("/vendor/{vendorId}")
    public List<Expense> getExpensesByVendor(@PathVariable String vendorId) {
        return expenseService.getExpensesByVendor(vendorId);
    }

    @GetMapping("/category/{category}")
    public List<Expense> getExpensesByExpenseCategory(@PathVariable String category) {
        return expenseService.getExpensesByCategory(category);
    }

    @GetMapping("/status/{status}")
    public List<Expense> getExpensesByPaymentStatus(@PathVariable String status) {
        return expenseService.getExpensesByPaymentStatus(status);
    }

    @GetMapping("/report/{invoiceNumber}")
    public ResponseEntity<byte[]> generateReportByInvoiceNumber(@PathVariable String invoiceNumber) {
        try {
            List<Expense> allExpenses = expenseService.getAllExpenses();
            byte[] reportContent = invoiceGeneratorService.generateReportByInvoiceNumber(invoiceNumber, allExpenses);

            HttpHeaders headers = new HttpHeaders();

            return ResponseEntity.ok().headers(headers).body(reportContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
