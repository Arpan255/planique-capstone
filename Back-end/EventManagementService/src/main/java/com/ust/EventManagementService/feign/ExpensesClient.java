package com.ust.EventManagementService.feign;

import com.ust.EventManagementService.Client.Expenses;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="expenses",url="http://localhost:9095")
public interface ExpensesClient {
    @GetMapping("/api/expenses/events/{eventId}")
    List<Expenses> getExpensesByEvent(@PathVariable String eventId);
}

