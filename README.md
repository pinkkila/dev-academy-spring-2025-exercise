# REST API and Dashboard exercise

The app is currently deployed at https://dev.pinkkila.com (made only for desktop).

## Backend

- REST API built with Spring Boot.
- Supports sorting, pagination, and filtering via query parameters.
- Testing:
  - Unit Tests: Logic-heavy components such as ElectricityDataService and ElectricityDataDailyQueryBuilder are tested in isolation to verify business rules and dynamic query generation.
  - Web Slice Tests (@WebMvcTest): REST controllers are tested with MockMvc to validate API contracts, HTTP status codes, and JSON response structures without loading the full application context.
  - Data Slice Tests (@JdbcTest): Repository layers are tested against a real PostgreSQL database using Testcontainers to validate custom SQL queries and result mapping.
  - JSON Serialization Tests (@JsonTest): DTO serialization is verified to ensure compliance with the API specification.
  - Full Integration Tests (@SpringBootTest): Complete backend request flows are validated by using the full Spring application context and executing real HTTP requests via TestRestTemplate against a PostgreSQL database running in Testcontainers.


## Frontend

- Dashboard build with React.
- Styled using shadcn/ui and Tailwind CSS.
- Data fetching with TanStack Query providing:
  - Caching
  - Loading and error handling


## How to run

Before running the project, make sure you have the following installed:
- Docker — for running the backend service in a container. 
- Java 21 — required if you prefer to run the backend locally instead of using Docker.
- Node.js and npm — for building and running the frontend.

### Backend (Spring Boot)

- Ensure Docker is installed and running on your machine.
- From the project root, start the backend service with the following command:

```
docker compose -f compose.backend.yaml up --build
```

This command builds the backend image (if needed) and starts the container.
Once running, the REST API will be available at `localhost:8080/api/electricity`.

#### Available endpoints

1. `GET /api/electricity`

Fetches daily electricity statistics with support for filtering, pagination, and sorting.

2. `GET /api/electricity/day/{date}`

Fetches data for a specific date.

##### Query Parameters

| Category                   | Parameters                                                                       |
|:---------------------------|:---------------------------------------------------------------------------------|
| Date range                 | startDate, endDate                                                               |
| Total Consumption          | minTotalConsumption, maxTotalConsumption                                         |
| Total Production           | minTotalProduction, maxTotalProduction                                           |
| Average Price              | minAveragePrice, maxAveragePrice                                                 |
| Consecutive Negative Hours | minConsecutiveNegativeHours, maxConsecutiveNegativeHours                         |
| Pagination                 | page, size (default size = 20)                                                   |
| Sorting                    | date, consecutiveNegativeHours, totalConsumption, totalProduction, averagePrice  |


##### Example Request

```
http://localhost:8080/api/electricity?startDate=2021-05-15&minConsecutiveNegativeHours=4&page=0&size=20&sort=consecutiveNegativeHours,asc
```


### Frontend (React + Vite)

- Navigate to the frontend directory and start the Vite development server:

```
cd frontend
npm install
npm run dev
```

Vite will start the development server at `localhost:5173`.

## UI images

![img.png](readme-imgs/daily-statistics-list.png)

![img_1.png](readme-imgs/filters.png)

![img_2.png](readme-imgs/single-day-view.png)

![img.png](readme-imgs/hourly-prices.png)

## Reference

This project is based on the Dev Academy Spring 2025 backend exercise published by Solita:  
https://github.com/solita/dev-academy-spring-2025-exercise

The solution, architecture, and implementation decisions in this repository are entirely my own.
