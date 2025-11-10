package com.pinkkila.backend.electricitydata;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ElectricityDataController.class)
class ElectricityDataControllerTest {
    
    @Autowired
    MockMvc mockMvc;
    
    @MockitoBean
    private ElectricityDataService electricityDataService;
    
    @Test
    void getElectricityDataSingleDayStatistics() throws Exception {
        var testData = new ElectricityDataSingeleDayDto(
                LocalDate.of(2024, 1, 1),
                BigDecimal.valueOf(208),
                BigDecimal.valueOf(302),
                BigDecimal.valueOf(3),
                LocalDateTime.of(2024, 1, 1, 1, 0, 0),
                List.of(
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 0, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 1, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 2, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 3, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 4, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 5, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 6, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 7, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 8, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 9, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 10, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 11, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 12, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 13, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 14, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 15, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 16, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 17, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 18, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 19, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 20, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 21, 0, 0), BigDecimal.valueOf(2)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 22, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 23, 0, 0), BigDecimal.valueOf(2))
                )
        );
        when(electricityDataService.getElectricityDataSingleDayStatistics(LocalDate.of(2024, 1, 1))).thenReturn(testData);
        
        mockMvc.perform(get("/api/electricity/day/2024-01-01"))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.date").value("2024-01-01"))
                .andExpect(jsonPath("$.totalConsumption").value(208))
                .andExpect(jsonPath("$.totalProduction").value(302))
                .andExpect(jsonPath("$.averagePrice").value(3))
                .andExpect(jsonPath("$.hourWithMostConsumptionVsProduction").value("2024-01-01T01:00:00"))
                .andExpect(jsonPath("$.hourlyPrices[0].startTime").value("2024-01-01T00:00:00"))
                .andExpect(jsonPath("$.hourlyPrices[0].hourlyPrice").value(4));
                
        
        verify(electricityDataService, times(1))
                .getElectricityDataSingleDayStatistics(LocalDate.of(2024, 1, 1));
    }
    
}