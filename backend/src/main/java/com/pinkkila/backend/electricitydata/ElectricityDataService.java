package com.pinkkila.backend.electricitydata;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ElectricityDataService {
    private final ElectricityDataRepository electricityDataRepository;
    
    public ElectricityDataSingeleDayDto getElectricityDataSingleDayStatistics(LocalDate date) {
        var singleDayData = electricityDataRepository.findAllByDate(date);
        
        var totalConsumption = singleDayData.stream()
                .map(ElectricityData::getConsumptionAmount)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        var totalProduction = singleDayData.stream()
                .map(ElectricityData::getProductionAmount)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        var averagePrice = singleDayData.stream()
                .map(ElectricityData::getHourlyPrice)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(BigDecimal.valueOf(singleDayData.size()), 2, RoundingMode.HALF_UP);
        
        var hourWithMostConsumptionVsProduction = singleDayData.stream()
                .filter(e -> e.getProductionAmount() != null && e.getConsumptionAmount() != null)
                .max(Comparator.comparing(e -> e.getConsumptionAmount().compareTo(e.getProductionAmount()) ))
                .map(ElectricityData::getStartTime)
                .orElse(null);
        
        var hourlyPrices = singleDayData.stream()
                .map(electricityData -> new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(electricityData.getStartTime(), electricityData.getHourlyPrice().setScale(2, RoundingMode.HALF_UP)))
                .toList();
        
        return new ElectricityDataSingeleDayDto(date, totalConsumption, totalProduction, averagePrice, hourWithMostConsumptionVsProduction, hourlyPrices);
    }
    
}
