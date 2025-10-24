package com.pinkkila.backend.electricitydatadaily;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/electricity")
public class ElectricityDataDailyController {
    private final ElectricityDataDailyService electricityDataDailyService;
    
    @GetMapping
    public ResponseEntity<Page<ElectricityDataDaily>> getElectricityDataDailyStatistics(
            @ModelAttribute ElectricityDataDailyRequestFilter filter,
            Pageable pageable) {
        return ResponseEntity.ok(electricityDataDailyService.getElectricityDataDayilyStatisticsPageWithFilters(filter, pageable));
    }
    
}
