DROP VIEW IF EXISTS electricity_data_daily;
DROP TABLE IF EXISTS electricity_data;

CREATE TABLE if not exists electricity_data
(
    id                 BIGINT PRIMARY KEY,
    date               DATE,
    start_time         TIMESTAMP,
    production_amount  NUMERIC(11, 5),
    consumption_amount NUMERIC(11, 3),
    hourly_price       NUMERIC(6, 3)
);

CREATE INDEX idx_electricity_data_date ON electricity_data (date);

CREATE OR REPLACE VIEW electricity_data_daily AS
WITH add_indicator AS (SELECT *, CASE WHEN hourly_price < 0 THEN 0 ELSE 1 END AS negative_price_indicator
                       FROM electricity_data),
     mark_daily_negative_seqs AS (SELECT date,
                                         start_time,
                                         production_amount,
                                         consumption_amount,
                                         hourly_price,
                                         negative_price_indicator,
                                         CASE
                                             WHEN (hourly_price >= 0 OR hourly_price IS NULL) THEN NULL
                                             ELSE SUM(negative_price_indicator) OVER (
                                                 PARTITION BY date
                                                 ORDER BY start_time
                                                 ) END AS daily_negative_seqs
                                  FROM add_indicator),
     count_negative_seqs AS (SELECT date,
                                    start_time,
                                    production_amount,
                                    consumption_amount,
                                    hourly_price,
                                    CASE
                                        WHEN (hourly_price >= 0 OR hourly_price IS NULL) THEN NULL
                                        ELSE COUNT(*) OVER (PARTITION BY date, daily_negative_seqs) END AS negative_hours_seq_count
                             FROM mark_daily_negative_seqs)
SELECT date,
       CASE
           WHEN COUNT(*) FILTER (WHERE production_amount IS NULL) > 0
               OR COUNT(*) < 24
               THEN NULL
           ELSE SUM(production_amount)
           END AS total_production,

       CASE
           WHEN COUNT(*) FILTER (WHERE consumption_amount IS NULL) > 0
               OR COUNT(*) < 24
               THEN NULL
           ELSE SUM(consumption_amount)
           END AS total_consumption,

       CASE
           WHEN COUNT(*) FILTER (WHERE hourly_price IS NULL) > 0
               OR COUNT(*) < 24
               THEN NULL
           ELSE ROUND(AVG(hourly_price)::NUMERIC, 2)
           END AS average_price,
       CASE
           WHEN COUNT(*) < 24
               THEN NULL
           ELSE COALESCE(MAX(negative_hours_seq_count), 0)
           END as consecutive_negative_hours
FROM count_negative_seqs
GROUP BY date;


