package com.pinkkila.backend.electricitydata;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ElectricityDataServiceTest {
    
    @Mock
    private ElectricityDataRepository electricityDataRepository;
    
    @InjectMocks
    private ElectricityDataService electricityDataService;
    
    @Test
    void getElectricityDataSingleDayStatisticsFromService() {
        var testData = List.of(
                new ElectricityData(1L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 0, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(2L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 1, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99))
        );
        
        when(electricityDataRepository.findAllByDate(LocalDate.of(2024, 1, 1))).thenReturn(testData);
        ElectricityDataSingeleDayDto data = electricityDataService.getElectricityDataSingleDayStatistics(LocalDate.of(2024, 1, 1));
        
        assertThat(data.date().isEqual(LocalDate.of(2024, 1, 1)));
        assertThat(data.totalConsumption()).isEqualTo(BigDecimal.valueOf(13));
        assertThat(data.totalProduction()).isEqualTo(BigDecimal.valueOf(18));
        assertThat(data.averagePrice()).isEqualTo(BigDecimal.valueOf(7.12));
        assertThat(data.hourWithMostConsumptionVsProduction()).isEqualTo(LocalDateTime.of(2024, 1, 1, 0, 0, 0));
        
        var hourlyPrices = data.hourlyPrices();
        assertThat(hourlyPrices.size()).isEqualTo(2);
        
        var first = hourlyPrices.getFirst();
        assertThat(first.startTime()).isEqualTo(LocalDateTime.of(2024, 1, 1, 0, 0));
        assertThat(first.hourlyPrice()).isEqualTo(BigDecimal.valueOf(8.24));
        
        var second = hourlyPrices.get(1);
        assertThat(second.startTime()).isEqualTo(LocalDateTime.of(2024, 1, 1, 1, 0));
        assertThat(second.hourlyPrice()).isEqualTo(BigDecimal.valueOf(5.99));
    }
}