package com.pinkkila.backend.electricitydatadaily;

import com.pinkkila.backend.exception.BadRequestException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.StringJoiner;

@Component
public class ElectricityDataDailyQueryBuilder {
    public record WhereClauseAndParams(String whereClause, Map<String, Object> params) {
    }
    
    private static final Map<String, String> SORT_PROPERTIES_MAP = Map.of(
            "date", "date",
            "totalConsumption", "total_consumption",
            "totalProduction", "total_production",
            "averagePrice", "average_price",
            "consecutiveNegativeHours", "consecutive_negative_hours"
    );
    
    public WhereClauseAndParams buildWhereClauseAndParams(ElectricityDataDailyRequestFilter filter) {
        StringJoiner whereConditions = new StringJoiner(" AND ");
        Map<String, Object> params = new LinkedHashMap<>();
        
        if (filter.startDate() != null) {
            whereConditions.add("date >= :startDate");
            params.put("startDate", filter.startDate());
        }
        if (filter.endDate() != null) {
            whereConditions.add("date <= :endDate");
            params.put("endDate", filter.endDate());
        }
        
        if (filter.minTotalConsumption() != null) {
            whereConditions.add("total_consumption >= :minTotalConsumption");
            params.put("minTotalConsumption", filter.minTotalConsumption());
        }
        if (filter.maxTotalConsumption() != null) {
            whereConditions.add("total_consumption <= :maxTotalConsumption");
            params.put("maxTotalConsumption", filter.maxTotalConsumption());
        }
        
        if (filter.minTotalProduction() != null) {
            whereConditions.add("total_production >= :minTotalProduction");
            params.put("minTotalProduction", filter.minTotalProduction());
        }
        if (filter.maxTotalProduction() != null) {
            whereConditions.add("total_production <= :maxTotalProduction");
            params.put("maxTotalProduction", filter.maxTotalProduction());
        }
        
        if (filter.minAveragePrice() != null) {
            whereConditions.add("average_price >= :minAveragePrice");
            params.put("minAveragePrice", filter.minAveragePrice());
        }
        if (filter.maxAveragePrice() != null) {
            whereConditions.add("average_price <= :maxAveragePrice");
            params.put("maxAveragePrice", filter.maxAveragePrice());
        }
        
        if (filter.minConsecutiveNegativeHours() != null) {
            whereConditions.add("consecutive_negative_hours >= :minConsecutiveNegativeHours");
            params.put("minConsecutiveNegativeHours", filter.minConsecutiveNegativeHours());
        }
        if (filter.maxConsecutiveNegativeHours() != null) {
            whereConditions.add("consecutive_negative_hours <= :maxConsecutiveNegativeHours");
            params.put("maxConsecutiveNegativeHours", filter.maxConsecutiveNegativeHours());
        }
        
        String whereClause = params.isEmpty() ? "" : " WHERE " + whereConditions;
        return new WhereClauseAndParams(whereClause, params);
    }
    
    public String buildOrderByClause(Pageable pageable) {
        Sort sort = pageable.getSort();
        
        if (!sort.isSorted()) {
            return " ORDER BY date";
        }
        
        StringJoiner orderByClause = new StringJoiner(", ", " ORDER BY ", "");
        for (var order : sort) {
            String requestedProperty = order.getProperty();
            String column = SORT_PROPERTIES_MAP.get(requestedProperty);
            
            if (column == null) {
                throw new BadRequestException("Unsupported sort property: '" + requestedProperty + "'. Allowed properties: " + SORT_PROPERTIES_MAP.keySet());
            }
            
            String direction = order.getDirection() == Sort.Direction.DESC ? "DESC" : "ASC";
            orderByClause.add(column + " " + direction);
        }
        
        return orderByClause.toString();
    }
}
