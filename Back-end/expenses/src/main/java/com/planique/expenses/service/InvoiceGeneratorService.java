package com.planique.expenses.service;

import com.planique.expenses.entity.Expense;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class InvoiceGeneratorService {

    public byte[] generateReportByInvoiceNumber(String invoiceNumber, List<Expense> allPayments) throws JRException {
        // Filter payments by invoice number
        List<Expense> filteredPayments = allPayments.stream()
                .filter(expense -> Objects.equals(expense.getInvoiceNumber(), invoiceNumber))
                .collect(Collectors.toList());

        // Load the .jrxml template
        InputStream reportTemplate = getClass().getResourceAsStream("/template.jrxml");

        // Compile the Jasper report from .jrxml to .jasper
        JasperReport jasperReport = JasperCompileManager.compileReport(reportTemplate);

        // Create parameters for the report
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("invoiceNumber", invoiceNumber);

        // Create a data source from your filtered data list
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(filteredPayments);

        // Fill the report
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        String outputDir = "C:/Reports/";
        String fileName = "PaymentReport_" + invoiceNumber + "_" + System.currentTimeMillis() + ".pdf";
        String filePath = outputDir + fileName;

        // Ensure the directory exists
        new File(outputDir).mkdirs();

        // Export the report to PDF and save it to the specified location
        JasperExportManager.exportReportToPdfFile(jasperPrint, filePath);
        // Export the report to PDF and return as byte array
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}
