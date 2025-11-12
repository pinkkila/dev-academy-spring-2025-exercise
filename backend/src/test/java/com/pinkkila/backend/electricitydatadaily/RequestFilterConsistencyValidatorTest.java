package com.pinkkila.backend.electricitydatadaily;

import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.ConstraintValidatorContext.ConstraintViolationBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class RequestFilterConsistencyValidatorTest {
    
    private RequestFilterConsistencyValidator validator;
    private ConstraintValidatorContext ctx;
    
    @BeforeEach
    void setUp() {
        validator = new RequestFilterConsistencyValidator();
        ctx = mock(ConstraintValidatorContext.class);
        ConstraintViolationBuilder builder = mock(ConstraintViolationBuilder.class);
        ConstraintViolationBuilder.NodeBuilderCustomizableContext nodeBuilder = mock(ConstraintViolationBuilder.NodeBuilderCustomizableContext.class);
        when(ctx.buildConstraintViolationWithTemplate(anyString())).thenReturn(builder);
        when(builder.addPropertyNode(anyString())).thenReturn(nodeBuilder);
        when(nodeBuilder.addConstraintViolation()).thenReturn(ctx);
    }
    
    @Test
    void isValid() {
        var filter = new ElectricityDataDailyRequestFilter(
                LocalDate.of(2024, 1, 1),
                LocalDate.of(2024, 1, 31),
                BigDecimal.ZERO, BigDecimal.TEN,
                BigDecimal.ZERO, BigDecimal.TEN,
                BigDecimal.ZERO, BigDecimal.TEN,
                0, 24
        );
        
        assertThat(validator.isValid(filter, ctx)).isTrue();
    }
    
    @Test
    void invalidDateRangeReturnsFalse() {
        var filter = new ElectricityDataDailyRequestFilter(
                LocalDate.of(2024, 1, 31),
                LocalDate.of(2024, 1, 1),
                null, null, null, null, null, null, null, null
        );
        
        assertThat(validator.isValid(filter, ctx)).isFalse();
        verify(ctx).buildConstraintViolationWithTemplate("must be <= endDate");
    }
    
    @Test
    void invalidMinMaxConsumptionReturnsFalse() {
        var filter = new ElectricityDataDailyRequestFilter(
                null, null,
                BigDecimal.TEN, BigDecimal.ONE,
                null, null,
                null, null,
                null, null
        );
        
        assertThat(validator.isValid(filter, ctx)).isFalse();
        verify(ctx).buildConstraintViolationWithTemplate("must be <= maxTotalConsumption");
    }
    
}