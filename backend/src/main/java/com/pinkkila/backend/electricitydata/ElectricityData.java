package com.pinkkila.backend.electricitydata;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ElectricityData {
    @Id
    private Long id;
    private LocalDate date;
    private LocalDateTime startTime;
    private BigDecimal productionAmount;
    private BigDecimal consumptionAmount;
    private BigDecimal hourlyPrice;
}
