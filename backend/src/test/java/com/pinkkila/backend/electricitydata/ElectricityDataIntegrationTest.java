package com.pinkkila.backend.electricitydata;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import com.pinkkila.backend.TestcontainersConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(TestcontainersConfiguration.class)
@ActiveProfiles("test")
public class ElectricityDataIntegrationTest {

    @Autowired
    TestRestTemplate restTemplate;
    
    @Test
    void getElectricityDataSingleDayStatistics() {
        ResponseEntity<String> response = this.restTemplate.getForEntity("/api/electricity/day/2023-12-01", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        
        DocumentContext json = JsonPath.parse(response.getBody());
        
        assertThat(json.read("$.date", String.class)).isEqualTo("2023-12-01");
    }
    
    @Test
    void consumptionProductionPriceAreNullWhenDaysDataIsNotComplete() {
        ResponseEntity<String> response = this.restTemplate.getForEntity("/api/electricity/day/2023-12-03", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        DocumentContext json = JsonPath.parse(response.getBody());

        assertThat(json.read("$.date", String.class)).isEqualTo("2023-12-03");
        assertThat(json.read("$.totalConsumption", BigDecimal.class)).isNull();
        assertThat(json.read("$.totalProduction", BigDecimal.class)).isNull();
        assertThat(json.read("$.averagePrice", BigDecimal.class)).isNull();
        assertThat(json.read("$.hourlyPrices", JSONArray.class)).hasSize(23);
        
    }

    

    

}
