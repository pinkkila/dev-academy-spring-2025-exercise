package com.pinkkila.backend.electricitydatadaily;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/electricity")
public class ElectricityDataDailyController {
    private final ElectricityDataDailyService electricityDataDailyService;
    
    @GetMapping
    public ResponseEntity<Page<ElectricityDataDaily>> getElectricityDataDailyStatistics(
            @Valid @ModelAttribute ElectricityDataDailyRequestFilter filter,
            BindingResult bindingResult,
            Pageable pageable) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        return ResponseEntity.ok(electricityDataDailyService.getElectricityDataDayilyStatisticsPageWithFilters(filter, pageable));
    }
    
}
