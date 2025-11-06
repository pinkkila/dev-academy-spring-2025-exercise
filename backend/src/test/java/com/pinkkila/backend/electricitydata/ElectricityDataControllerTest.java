package com.pinkkila.backend.electricitydata;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.assertj.MockMvcTester;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@WebMvcTest(ElectricityDataController.class)
class ElectricityDataControllerTest {
    
    @Autowired
    MockMvcTester mockMvc;
    
    @MockitoBean
    private ElectricityDataService electricityDataService;
    
    @Test
    void getElectricityDataSingleDayStatisticsFromController() {
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
        
        var response = mockMvc.get().uri("/api/electricity/day/2024-01-01");
        
        assertThat(response).contentType().isEqualTo(MediaType.APPLICATION_JSON);
        assertThat(response).hasStatus(HttpStatus.OK);
        assertThat(response).bodyJson().extractingPath("$.date").isEqualTo("2024-01-01");
        assertThat(response).bodyJson().extractingPath("$.totalConsumption").isEqualTo(208);
        assertThat(response).bodyJson().extractingPath("$.totalProduction").isEqualTo(302);
        assertThat(response).bodyJson().extractingPath("$.averagePrice").isEqualTo(3);
        assertThat(response).bodyJson().extractingPath("$.hourWithMostConsumptionVsProduction").isEqualTo("2024-01-01T01:00:00");
        assertThat(response).bodyJson().extractingPath("$.hourlyPrices[0].startTime").isEqualTo("2024-01-01T00:00:00");
        assertThat(response).bodyJson().extractingPath("$.hourlyPrices[0].hourlyPrice").isEqualTo(4);
        assertThat(response).bodyJson().extractingPath("$.hourlyPrices[1].startTime").isEqualTo("2024-01-01T01:00:00");
        assertThat(response).bodyJson().extractingPath("$.hourlyPrices[1].hourlyPrice").isEqualTo(2);
    }
    
}