package com.pinkkila.backend.electricitydatadaily;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;

@WebMvcTest(ElectricityDataDailyController.class)
class ElectricityDataDailyControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockitoBean
    private ElectricityDataDailyService electricityDataDailyService;
    
    void getElectricityDataDailyStatisticsFromController() {
        var testData = new ElectricityDataDaily(LocalDate.of(2024, 1, 1), BigDecimal.valueOf(303), BigDecimal.valueOf(400), BigDecimal.valueOf(3.40), 2);

    }
    
}