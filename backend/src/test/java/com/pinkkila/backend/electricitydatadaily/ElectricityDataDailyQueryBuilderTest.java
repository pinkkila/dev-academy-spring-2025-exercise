package com.pinkkila.backend.electricitydatadaily;

import com.pinkkila.backend.exception.BadRequestException;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

public class ElectricityDataDailyQueryBuilderTest {
    
    private final ElectricityDataDailyQueryBuilder builder = new ElectricityDataDailyQueryBuilder();
    
    @Test
    void buildWhereClauseAndParamsWithDatesAndRangeReturnsCorrectWhereAndParams() {
        var filter = new ElectricityDataDailyRequestFilter(
                LocalDate.of(2024, 1, 1),
                LocalDate.of(2024, 1, 31),
                null, null, null, null, null, null, null, null
        );
        
        var result = builder.buildWhereClauseAndParams(filter);
        
        assertThat(result.whereClause()).startsWith(" WHERE ");
        assertThat(result.whereClause()).contains("date >= :startDate").contains("date <= :endDate");
        assertThat(result.params()).containsEntry("startDate", LocalDate.of(2024, 1, 1))
                .containsEntry("endDate", LocalDate.of(2024, 1, 31));
    }
    
    @Test
    void buildWhereClauseAndParamsEmptyFilterReturnsEmptyWhere() {
        var filter = new ElectricityDataDailyRequestFilter(null, null, null, null, null, null, null, null, null, null);
        var result = builder.buildWhereClauseAndParams(filter);
        
        assertThat(result.whereClause()).isEqualTo("");
        assertThat(result.params()).isEmpty();
    }
    
    
    @Test
    void buildOrderByClauseDefaultSortReturnsDateAsc() {
        var pageable = Pageable.unpaged();
        var clause = builder.buildOrderByClause(pageable);
        assertThat(clause).isEqualTo(" ORDER BY date");
    }
    
    
    @Test
    void buildOrderByClauseUnknownPropertyThrowsBadRequest() {
        var pageable = PageRequest.of(0, 10, Sort.by("notExists"));
        assertThatThrownBy(() -> builder.buildOrderByClause(pageable))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Unsupported sort property");
    }
}

