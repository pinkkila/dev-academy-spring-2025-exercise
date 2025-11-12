package com.pinkkila.backend.electricitydatadaily;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@ValidFilter
public record ElectricityDataDailyRequestFilter(
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate startDate,
        
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate endDate,
        
        @DecimalMin(value = "0.0")
        BigDecimal minTotalConsumption,
        
        @DecimalMin(value = "0.0")
        BigDecimal maxTotalConsumption,
        
        @DecimalMin(value = "0.0")
        BigDecimal minTotalProduction,
        
        @DecimalMin(value = "0.0")
        BigDecimal maxTotalProduction,
        
        BigDecimal minAveragePrice,
        
        BigDecimal maxAveragePrice,
        
        @Min(0)
        @Max(24)
        Integer minConsecutiveNegativeHours,
        
        @Min(0)
        @Max(24)
        Integer maxConsecutiveNegativeHours
) {
}
