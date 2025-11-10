package com.pinkkila.backend.electricitydatadaily;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(MockitoExtension.class)
class ElectricityDataDailyServiceTest {
    
    @Mock
    private ElectricityDataDailyRepository electricityDataDailyRepository;
    
    @InjectMocks
    private ElectricityDataDailyService electricityDataDailyService;
    
    @Test
    void getElectricityDataDayilyStatisticsPageWithFilters() {
        
        var testData = List.of(
                new ElectricityDataDaily(LocalDate.of(2024, 1, 1), BigDecimal.valueOf(303), BigDecimal.valueOf(400), BigDecimal.valueOf(3.40), 2),
                new ElectricityDataDaily(LocalDate.of(2024, 1, 2), BigDecimal.valueOf(403), BigDecimal.valueOf(504), BigDecimal.valueOf(4.32), 1)
        );
        var filter = new ElectricityDataDailyRequestFilter(null, null, null, null, null, null,null, null, null, null);
        var pageable = PageRequest.of(0, 2);
        var page = new PageImpl<>(testData, pageable, testData.size());
    
        when(electricityDataDailyRepository.findPageWithFilters(filter, pageable)).thenReturn(page);
        
        var result = electricityDataDailyService.getElectricityDataDayilyStatisticsPageWithFilters(filter, pageable);
        
        assertThat(result).isEqualTo(page);
        
    }
    
}