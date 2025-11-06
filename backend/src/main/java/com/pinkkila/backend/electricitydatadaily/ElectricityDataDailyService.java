package com.pinkkila.backend.electricitydatadaily;

import com.pinkkila.backend.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.StringJoiner;

@Service
@RequiredArgsConstructor
public class ElectricityDataDailyService {
    private final ElectricityDataDailyRepository electricityDataDailyRepository;
    
    public Page<ElectricityDataDaily> getElectricityDataDayilyStatisticsPageWithFilters(
            ElectricityDataDailyRequestFilter filter,
            Pageable pageable
    ) {
        return electricityDataDailyRepository.findPageWithFilters(filter, pageable);
    }
    
    
}
