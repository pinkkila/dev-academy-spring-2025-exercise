package com.pinkkila.backend.electricitydata;

import org.springframework.data.repository.ListCrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface ElectricityDataRepository extends ListCrudRepository<ElectricityData, Long> {
    List<ElectricityData> findAllByDate(LocalDate date);
}
