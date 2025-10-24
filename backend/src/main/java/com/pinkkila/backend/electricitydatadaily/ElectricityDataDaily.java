package com.pinkkila.backend.electricitydatadaily;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ElectricityDataDaily(
        LocalDate date,
        BigDecimal totalConsumption,
        BigDecimal totalProduction,
        BigDecimal averagePrice,
        int consecutiveNegativeHours
) {
}
