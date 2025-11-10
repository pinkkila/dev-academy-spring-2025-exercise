package com.pinkkila.backend.electricitydatadaily;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@JsonTest
public class ElectricityDataDailyJsonTest {
    
    @Autowired
    private JacksonTester<ElectricityDataDaily> json;
    
    @Test
    void testElectricityDataDailySerialization() throws Exception {
        var testData = new ElectricityDataDaily(
                LocalDate.of(2024, 6, 6),
                BigDecimal.valueOf(106544715.678),
                BigDecimal.valueOf(740704.81),
                BigDecimal.valueOf(2.28),
                0
        );
        
        var result = json.write(testData);
        
        assertThat(result).isEqualToJson("/json-examples/daily.json");
        assertThat(result).hasJsonPathValue("$.date");
        assertThat(result).hasJsonPathValue("$.totalConsumption");
        assertThat(result).hasJsonPathValue("$.totalProduction");
        assertThat(result).hasJsonPathValue("$.averagePrice");
        assertThat(result).hasJsonPathValue("$.consecutiveNegativeHours");
        assertThat(result).extractingJsonPathStringValue("$.date").isEqualTo("2024-06-06");
        assertThat(result).extractingJsonPathNumberValue("$.totalConsumption").isEqualTo(106544715.678);
        assertThat(result).extractingJsonPathNumberValue("$.totalProduction").isEqualTo(740704.81);
        assertThat(result).extractingJsonPathNumberValue("$.averagePrice").isEqualTo(2.28);
        assertThat(result).extractingJsonPathNumberValue("$.consecutiveNegativeHours").isEqualTo(0);
        
    }
    
}
