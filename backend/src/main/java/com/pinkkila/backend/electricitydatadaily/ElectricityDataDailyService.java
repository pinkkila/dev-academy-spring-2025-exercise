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
    private final JdbcClient jdbcClient;
    
    public Page<ElectricityDataDaily> getElectricityDataDayilyStatisticsPageWithFilters(
            ElectricityDataDailyRequestFilter filter,
            Pageable pageable
    ) {
        String baseSql = """
                    SELECT date, total_production, total_consumption, average_price, consecutive_negative_hours
                    FROM electricity_data_daily
                """;
        
        var whereClauseAndParams = buildWhereClauseAndParams(filter);
        String orderByClause = buildOrderByClause(pageable);
        String limitOffsetClause = " LIMIT :limit OFFSET :offset";
        String sql = baseSql + whereClauseAndParams.whereClause + orderByClause + limitOffsetClause;
        
        var statement = jdbcClient.sql(sql);
        for (var param : whereClauseAndParams.params.entrySet()) {
            statement = statement.param(param.getKey(), param.getValue());
        }
        var data = statement
                .param("limit", pageable.getPageSize())
                .param("offset", pageable.getOffset())
                .query(ElectricityDataDaily.class)
                .list();
        
        String countSql = "SELECT COUNT(*) FROM electricity_data_daily" + whereClauseAndParams.whereClause;
        var countStatement = jdbcClient.sql(countSql);
        for (var param : whereClauseAndParams.params.entrySet()) {
            countStatement = countStatement.param(param.getKey(), param.getValue());
        }
        long total = countStatement.query(Long.class).single();
        
        return new PageImpl<>(data, pageable, total);
    }
    
    private record WhereClauseAndParams(String whereClause, Map<String, Object> params) {
    }
    
    private WhereClauseAndParams buildWhereClauseAndParams(ElectricityDataDailyRequestFilter filter) {
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
    
    private String buildOrderByClause(Pageable pageable) {
        Map<String, String> sortPropertiesToColumn = Map.of(
                "date", "date",
                "totalConsumption", "total_consumption",
                "totalProduction", "total_production",
                "averagePrice", "average_price",
                "consecutiveNegativeHours", "consecutive_negative_hours"
        );
        Sort sort = pageable.getSort();
        
        if (!sort.isSorted()) {
            return " ORDER BY date";
        }
        
        StringJoiner orderByClause = new StringJoiner(", ", " ORDER BY ", "");
        for (var order : sort) {
            String requestedProperty = order.getProperty();
            String column = sortPropertiesToColumn.get(requestedProperty);
            
            if (column == null) {
                throw new BadRequestException("Unsupported sort property: '" + requestedProperty + "'. Allowed properties: " + sortPropertiesToColumn.keySet());
            }
            
            String direction = order.getDirection() == Sort.Direction.DESC ? "DESC" : "ASC";
            orderByClause.add(column + " " + direction);
        }
        
        return orderByClause.toString();
    }
    
    
}
