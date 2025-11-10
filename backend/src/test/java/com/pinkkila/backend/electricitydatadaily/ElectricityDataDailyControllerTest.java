package com.pinkkila.backend.electricitydatadaily;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ElectricityDataDailyController.class)
class ElectricityDataDailyControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockitoBean
    private ElectricityDataDailyService electricityDataDailyService;
    
    @Captor
    private ArgumentCaptor<ElectricityDataDailyRequestFilter> filterCaptor;
    
    @Test
    void getElectricityDataDailyStatistics() throws Exception {
        var testData = List.of(
                new ElectricityDataDaily(LocalDate.of(2024, 1, 1), BigDecimal.valueOf(303), BigDecimal.valueOf(400), BigDecimal.valueOf(3.40), 2),
                new ElectricityDataDaily(LocalDate.of(2024, 1, 2), BigDecimal.valueOf(403), BigDecimal.valueOf(504), BigDecimal.valueOf(4.32), 1)
        );
        
        var pageable = PageRequest.of(0, 2);
        var page = new PageImpl<>(testData, pageable, testData.size());
        
        when(electricityDataDailyService.getElectricityDataDayilyStatisticsPageWithFilters(
                any(ElectricityDataDailyRequestFilter.class),
                eq(pageable)
        )).thenReturn(page);
        
        mockMvc.perform(get("/api/electricity?startDate=2024-01-01&page=0&size=2"))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].date").value("2024-01-01"))
                .andExpect(jsonPath("$.content[1].date").value("2024-01-02"));

        verify(electricityDataDailyService).getElectricityDataDayilyStatisticsPageWithFilters(
                filterCaptor.capture(),
                eq(pageable)
        );
        
        var capturedFilter = filterCaptor.getValue();
        assertThat(capturedFilter.startDate()).isEqualTo(LocalDate.of(2024, 1, 1));
    }
    
}