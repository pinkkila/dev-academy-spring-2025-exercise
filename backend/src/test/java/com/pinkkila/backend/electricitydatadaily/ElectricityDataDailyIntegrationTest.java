package com.pinkkila.backend.electricitydatadaily;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
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
public class ElectricityDataDailyIntegrationTest {
    
    @Autowired
    TestRestTemplate restTemplate;
    
    @Test
    void getElectricityDataDailyStatistics() {
        ResponseEntity<String> response = this.restTemplate.getForEntity("/api/electricity", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        
        DocumentContext json = JsonPath.parse(response.getBody());
        
        assertThat(json.read("$.page.totalElements", Integer.class)).isEqualTo(3);
        assertThat(json.read("$.content[0].date", String.class)).isEqualTo("2023-12-01");
    }
    
    @Test
    void getElectricityDataDailyStatisticsWithFilterParams() {
        ResponseEntity<String> response = this.restTemplate.getForEntity("/api/electricity?startDate=2023-12-02", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        
        DocumentContext json = JsonPath.parse(response.getBody());
        
        assertThat(json.read("$.page.totalElements", Integer.class)).isEqualTo(2);
        assertThat(json.read("$.content[0].date", String.class)).isEqualTo("2023-12-02");
    }
    
    @Test
    void getElectricityDataDailyStatisticsWithPageAndSortingParams() {
        ResponseEntity<String> response = this.restTemplate.getForEntity("/api/electricity?page=0&size=2&sort=date,desc", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        
        DocumentContext json = JsonPath.parse(response.getBody());
        
        assertThat(json.read("$.page.totalElements", Integer.class)).isEqualTo(3);
        assertThat(json.read("$.content[0].date", String.class)).isEqualTo("2023-12-03");
    }
    
    @Test
    void consumptionProductionPriceAreNullWhenDaysDataIsNotComplete() {
        ResponseEntity<String> response = this.restTemplate.getForEntity("/api/electricity?startDate=2023-12-03", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        
        DocumentContext json = JsonPath.parse(response.getBody());
        
        assertThat(json.read("$.content[0].date", String.class)).isEqualTo("2023-12-03");
        assertThat(json.read("$.content[0].totalConsumption", BigDecimal.class)).isNull();
        assertThat(json.read("$.content[0].totalProduction", BigDecimal.class)).isNull();
        assertThat(json.read("$.content[0].averagePrice", BigDecimal.class)).isNull();
    }
    
    @Test
    void invalidQueryParamsReturnsBadRequest() {
        ResponseEntity<String> response = this.restTemplate.getForEntity("/api/electricity?startDate=2023-12-03&endDate=2023-12-01", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        
        DocumentContext json = JsonPath.parse(response.getBody());
        
        assertThat(json.read("$.message", String.class)).isEqualTo("startDate must be <= endDate");
    }
    
}
