package com.pinkkila.backend.electricitydata;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/electricity")
public class ElectricityDataController {
    private final ElectricityDataService electricityDataService;
    
    @GetMapping("/day/{date}")
    public ResponseEntity<ElectricityDataSingeleDayDto> getElectricityDataSingleDayStatistics(@PathVariable LocalDate date) {
        return ResponseEntity.ok(this.electricityDataService.getElectricityDataSingleDayStatistics(date));
    }

}
