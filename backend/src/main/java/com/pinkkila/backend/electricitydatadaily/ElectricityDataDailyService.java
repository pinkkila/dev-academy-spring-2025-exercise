package com.pinkkila.backend.electricitydatadaily;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ElectricityDataDailyService {
    private final ElectricityDataDailyRepository electricityDataDailyRepository;
    
    public Page<ElectricityDataDaily> getElectricityDataDayilyStatisticsPageWithFilters(
            ElectricityDataDailyRequestFilter filter,
            Pageable pageable
    ) {
        int maxPageSize = 100;
        if (pageable.getPageSize() > maxPageSize) {
            pageable = PageRequest.of(pageable.getPageNumber(), maxPageSize, pageable.getSort());
        }
        return electricityDataDailyRepository.findPageWithFilters(filter, pageable);
    }
    
}
