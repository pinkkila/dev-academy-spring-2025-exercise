package com.pinkkila.backend.electricitydatadaily;

import com.pinkkila.backend.TestcontainersConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@JdbcTest
@Import({ElectricityDataDailyRepositoryImpl.class, ElectricityDataDailyQueryBuilder.class, TestcontainersConfiguration.class})
@ActiveProfiles("test")
public class ElectricityDataDailyRepositoryTest {
    
    @Autowired
    private ElectricityDataDailyRepository repository;
    
    @Test
    void findPageWithFiltersWithoutFilterParams() {
        var filter = new ElectricityDataDailyRequestFilter(null, null, null, null, null, null, null, null, null, null);
        var pageable = PageRequest.of(0, 2);
        
        var result = repository.findPageWithFilters(filter, pageable);
        
        assertThat(result.getContent()).hasSize(2);
        assertThat(result.getContent().getFirst().date()).isEqualTo(LocalDate.of(2023, 12, 1));
        
    }
    
    @Test
    void findPageWithFiltersWithFilters() {
        var filter = new ElectricityDataDailyRequestFilter(LocalDate.of(2023, 12, 2), LocalDate.of(2023, 12, 2), null, null, null, null, null, null, null, null);
        var pageable = PageRequest.of(0, 2);
        
        var result = repository.findPageWithFilters(filter, pageable);
        
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().getFirst().date()).isEqualTo(LocalDate.of(2023, 12, 2));
        
    }
    
    
}
