package com.pinkkila.backend.electricitydata;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;

@Service
@RequiredArgsConstructor
public class ElectricityDataService {
    private final ElectricityDataRepository electricityDataRepository;
    
    public ElectricityDataSingeleDayDto getElectricityDataSingleDayStatistics(LocalDate date) {
        var singleDayData = electricityDataRepository.findAllByDate(date);
        
        if(singleDayData.isEmpty()) {
            throw new SingleDayStatisticsNotFoundException("Electricity data not found for date: " + date);
        }
        
        var hourlyPrices = singleDayData.stream()
                .map(electricityData -> new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(
                        electricityData.getStartTime(),
                        electricityData.getHourlyPrice() != null
                                ? electricityData.getHourlyPrice().setScale(2, RoundingMode.HALF_UP)
                                : null))
                .toList();
        
        if (singleDayData.size() != 24) {
            return new ElectricityDataSingeleDayDto(date, null, null, null, null, hourlyPrices);
        }
        
        var hasNullConsumptionValues = singleDayData.stream()
                .anyMatch(e -> e.getConsumptionAmount() == null);
        BigDecimal totalConsumption = null;
        if(!hasNullConsumptionValues) {
            totalConsumption = singleDayData.stream()
                    .map(ElectricityData::getConsumptionAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
        
        var hasNullProductionValues = singleDayData.stream()
                .anyMatch(e -> e.getProductionAmount() == null);
        BigDecimal totalProduction = null;
        if(!hasNullProductionValues) {
            totalProduction = singleDayData.stream()
                    .map(ElectricityData::getProductionAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
        
        var hasNullPriceValues = singleDayData.stream()
                .anyMatch(e -> e.getHourlyPrice() == null);
        BigDecimal averagePrice = null;
        if(!hasNullPriceValues) {
            averagePrice = singleDayData.stream()
                    .map(ElectricityData::getHourlyPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .divide(BigDecimal.valueOf(24), 2, RoundingMode.HALF_UP);
        }
        
        LocalDateTime hourWithMostConsumptionVsProduction = null;
        if  (!hasNullConsumptionValues && !hasNullProductionValues) {
            hourWithMostConsumptionVsProduction = singleDayData.stream()
                .max(Comparator.comparing(e -> e.getConsumptionAmount().subtract(e.getProductionAmount())))
                .map(ElectricityData::getStartTime)
                .orElse(null);
        }

        
        return new ElectricityDataSingeleDayDto(date, totalConsumption, totalProduction, averagePrice, hourWithMostConsumptionVsProduction, hourlyPrices);
    }
    
}
