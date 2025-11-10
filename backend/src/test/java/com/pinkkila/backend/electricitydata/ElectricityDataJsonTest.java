package com.pinkkila.backend.electricitydata;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@JsonTest
public class ElectricityDataJsonTest {
    
    @Autowired
    private JacksonTester<ElectricityDataSingeleDayDto> json;
    
    @Test
    void tesElectricityDataSingeleDayDtoSerialization() throws Exception {
        var testDto = new ElectricityDataSingeleDayDto(
                LocalDate.of(2024, 1, 1),
                BigDecimal.valueOf(8),
                BigDecimal.valueOf(10),
                BigDecimal.valueOf(3),
                LocalDateTime.of(2024, 1, 1, 1, 0, 0),
                List.of(
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 0, 0, 0), BigDecimal.valueOf(4)),
                        new ElectricityDataSingeleDayDto.ElectricityHourPriceDto(LocalDateTime.of(2024, 1, 1, 1, 0, 0), BigDecimal.valueOf(2))
                )
        );
        
        var result = json.write(testDto);
        
        assertThat(result).isEqualToJson("/json-examples/single-day.json");
        assertThat(result).hasJsonPathValue("$.date");
        assertThat(result).hasJsonPathValue("$.totalConsumption");
        assertThat(result).hasJsonPathValue("$.totalProduction");
        assertThat(result).hasJsonPathValue("$.averagePrice");
        assertThat(result).hasJsonPathValue("$.hourWithMostConsumptionVsProduction");
        assertThat(result).hasJsonPathValue("$.hourlyPrices");
        assertThat(result).extractingJsonPathStringValue("$.date").isEqualTo("2024-01-01");
        assertThat(result).extractingJsonPathNumberValue("$.totalConsumption").isEqualTo(8);
        assertThat(result).extractingJsonPathNumberValue("$.totalProduction").isEqualTo(10);
        assertThat(result).extractingJsonPathNumberValue("$.averagePrice").isEqualTo(3);
        assertThat(result).extractingJsonPathArrayValue("$.hourlyPrices").hasSize(2);
        assertThat(result).extractingJsonPathStringValue("$.hourlyPrices[0].startTime").isEqualTo("2024-01-01T00:00:00");
        assertThat(result).extractingJsonPathNumberValue("$.hourlyPrices[0].hourlyPrice").isEqualTo(4);
        assertThat(result).extractingJsonPathStringValue("$.hourlyPrices[1].startTime").isEqualTo("2024-01-01T01:00:00");
        assertThat(result).extractingJsonPathNumberValue("$.hourlyPrices[1].hourlyPrice").isEqualTo(2);
        
    }
    
}
