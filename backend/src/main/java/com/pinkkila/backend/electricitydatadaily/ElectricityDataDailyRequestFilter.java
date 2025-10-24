package com.pinkkila.backend.electricitydatadaily;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ElectricityDataDailyRequestFilter(
        LocalDate startDate,
        LocalDate endDate,
        BigDecimal minTotalConsumption,
        BigDecimal maxTotalConsumption,
        BigDecimal minTotalProduction,
        BigDecimal maxTotalProduction,
        BigDecimal minAveragePrice,
        BigDecimal maxAveragePrice,
        Integer minConsecutiveNegativeHours,
        Integer maxConsecutiveNegativeHours
) {
}
