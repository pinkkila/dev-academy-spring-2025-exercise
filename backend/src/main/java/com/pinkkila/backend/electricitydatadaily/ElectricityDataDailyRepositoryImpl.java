package com.pinkkila.backend.electricitydatadaily;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ElectricityDataDailyRepositoryImpl implements ElectricityDataDailyRepository {
    private final JdbcClient jdbcClient;
    private final ElectricityDataDailyQueryBuilder queryBuilder;
    
    @Override
    public Page<ElectricityDataDaily> findPageWithFilters(ElectricityDataDailyRequestFilter filter, Pageable pageable) {
        String baseSql = """
                    SELECT date, total_production, total_consumption, average_price, consecutive_negative_hours
                    FROM electricity_data_daily
                """;
        
        var whereClauseAndParams = queryBuilder.buildWhereClauseAndParams(filter);
        String orderByClause = queryBuilder.buildOrderByClause(pageable);
        String limitOffsetClause = " LIMIT :limit OFFSET :offset";
        String sql = baseSql + whereClauseAndParams.whereClause() + orderByClause + limitOffsetClause;
        
        // IntelliJ warns that using String in SQL can be unsafe.
        // The query is built using only controlled, validated parts:
        // - WHERE and ORDER BY clauses are constructed by ElectricityDataDailyQueryBuilder,
        //   which uses predefined column mappings (no raw user input).
        // - Parameters are bound via named parameters.
        var statement = jdbcClient.sql(sql);
        for (var param : whereClauseAndParams.params().entrySet()) {
            statement = statement.param(param.getKey(), param.getValue());
        }
        var data = statement
                .param("limit", pageable.getPageSize())
                .param("offset", pageable.getOffset())
                .query(ElectricityDataDaily.class)
                .list();
        
        String countSql = "SELECT COUNT(*) FROM electricity_data_daily" + whereClauseAndParams.whereClause();
        var countStatement = jdbcClient.sql(countSql);
        for (var param : whereClauseAndParams.params().entrySet()) {
            countStatement = countStatement.param(param.getKey(), param.getValue());
        }
        long total = countStatement.query(Long.class).single();
        
        return new PageImpl<>(data, pageable, total);
    }
    
}
