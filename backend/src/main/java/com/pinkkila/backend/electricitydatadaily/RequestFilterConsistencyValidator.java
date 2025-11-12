package com.pinkkila.backend.electricitydatadaily;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.math.BigDecimal;
import java.time.LocalDate;

public class RequestFilterConsistencyValidator implements ConstraintValidator<ValidFilter, ElectricityDataDailyRequestFilter> {
    
    @Override
    public boolean isValid(ElectricityDataDailyRequestFilter filter, ConstraintValidatorContext ctx) {
        if (filter == null) return true;
        
        boolean ok = true;
        
        LocalDate startDate = filter.startDate();
        LocalDate endDate = filter.endDate();
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            ctx.buildConstraintViolationWithTemplate("must be <= endDate")
                    .addPropertyNode("startDate").addConstraintViolation();
            ok = false;
        }
        
        ok = ok && checkMinMax(filter.minTotalConsumption(), filter.maxTotalConsumption(), "minTotalConsumption", "maxTotalConsumption", ctx);
        ok = ok && checkMinMax(filter.minTotalProduction(), filter.maxTotalProduction(), "minTotalProduction", "maxTotalProduction", ctx);
        ok = ok && checkMinMax(filter.minAveragePrice(), filter.maxAveragePrice(), "minAveragePrice", "maxAveragePrice", ctx);
        
        if (filter.minConsecutiveNegativeHours() != null && filter.maxConsecutiveNegativeHours() != null &&
                filter.minConsecutiveNegativeHours() > filter.maxConsecutiveNegativeHours()) {
            ctx.buildConstraintViolationWithTemplate("must be <= maxConsecutiveNegativeHours")
                    .addPropertyNode("minConsecutiveNegativeHours").addConstraintViolation();
            ok = false;
        }
        
        return ok;
    }
    
    private boolean checkMinMax(BigDecimal min, BigDecimal max, String minName, String maxName, ConstraintValidatorContext ctx) {
        if (min != null && max != null && min.compareTo(max) > 0) {
            ctx.buildConstraintViolationWithTemplate("must be <= " + maxName)
                    .addPropertyNode(minName).addConstraintViolation();
            return false;
        }
        return true;
    }
}
