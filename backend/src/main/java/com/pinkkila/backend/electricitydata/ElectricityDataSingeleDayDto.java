package com.pinkkila.backend.electricitydata;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record ElectricityDataSingeleDayDto(
        LocalDate date,
        BigDecimal totalConsumption,
        BigDecimal totalProduction,
        BigDecimal averagePrice,
        LocalDateTime hourWithMostConsumptionVsProduction,
        List<ElectricityHourPriceDto> hourlyPrices
) {
    public record ElectricityHourPriceDto(LocalDateTime startTime, BigDecimal hourlyPrice) {
    }
}
