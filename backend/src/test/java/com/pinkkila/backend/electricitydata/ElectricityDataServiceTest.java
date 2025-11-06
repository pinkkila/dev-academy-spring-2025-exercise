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
                new ElectricityData(2L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 1, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(3L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 2, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(4L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 3, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(5L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 4, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(6L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 5, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(7L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 6, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(8L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 7, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(9L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 8, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(10L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 9, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(11L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 10, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(12L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 11, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(13L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 12, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(14L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 13, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(15L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 14, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(16L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 15, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(17L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 16, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(18L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 17, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(19L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 18, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(20L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 19, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(21L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 20, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(22L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 21, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99)),
                new ElectricityData(23L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 22, 0, 0), BigDecimal.valueOf(10), BigDecimal.valueOf(8), BigDecimal.valueOf(8.24)),
                new ElectricityData(24L, LocalDate.of(2024, 1, 1), LocalDateTime.of(2024, 1, 1, 23, 0, 0), BigDecimal.valueOf(8), BigDecimal.valueOf(5), BigDecimal.valueOf(5.99))
        );
        
        when(electricityDataRepository.findAllByDate(LocalDate.of(2024, 1, 1))).thenReturn(testData);
        ElectricityDataSingeleDayDto data = electricityDataService.getElectricityDataSingleDayStatistics(LocalDate.of(2024, 1, 1));
        
        assertThat(data.date().isEqual(LocalDate.of(2024, 1, 1)));
        assertThat(data.totalConsumption()).isEqualTo(BigDecimal.valueOf(156));
        assertThat(data.totalProduction()).isEqualTo(BigDecimal.valueOf(216));
        assertThat(data.averagePrice()).isEqualTo(BigDecimal.valueOf(7.12));
        assertThat(data.hourWithMostConsumptionVsProduction()).isEqualTo(LocalDateTime.of(2024, 1, 1, 0, 0, 0));
        
        var hourlyPrices = data.hourlyPrices();
        assertThat(hourlyPrices.size()).isEqualTo(24);
        
        var first = hourlyPrices.getFirst();
        assertThat(first.startTime()).isEqualTo(LocalDateTime.of(2024, 1, 1, 0, 0));
        assertThat(first.hourlyPrice()).isEqualTo(BigDecimal.valueOf(8.24));
        
        var second = hourlyPrices.get(1);
        assertThat(second.startTime()).isEqualTo(LocalDateTime.of(2024, 1, 1, 1, 0));
        assertThat(second.hourlyPrice()).isEqualTo(BigDecimal.valueOf(5.99));
    }
}