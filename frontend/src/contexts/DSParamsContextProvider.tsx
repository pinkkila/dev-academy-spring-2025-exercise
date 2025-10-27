import { type ReactNode, useState } from "react";
import { DSParamsContext } from "./ds-params-context";

export default function DSParamsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortBy, setSortBy] = useState("date,asc");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [minConsumption, setMinConsumption] = useState<string | null>(null);
  const [maxConsumption, setMaxConsumption] = useState<string | null>(null);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState<[number, number] | null>(null);
  const [debouncedNegPeriodRange, setDebouncedNegPeriodRange] = useState<[number, number] | null>(null);


  const params = new URLSearchParams();

  if (startDate) {
    params.set("startDate", startDate);
  }
  if (endDate) {
    params.set("endDate", endDate);
  }

  if (minConsumption) {
    params.set("minTotalConsumption", minConsumption);
  }
  if (maxConsumption) {
    params.set("maxTotalConsumption", maxConsumption);
  }


  if (debouncedPriceRange && (debouncedPriceRange[0] !== -18.00)) {
    const minAveragePrice = debouncedPriceRange[0];
    params.set("minAveragePrice", minAveragePrice.toString());
  }
  if (debouncedPriceRange && (debouncedPriceRange[1] !== 109.97)) {
    const maxAveragePrice = debouncedPriceRange[1];
    params.set("maxAveragePrice", maxAveragePrice.toString());
  }

  if (debouncedNegPeriodRange && (debouncedNegPeriodRange[0] !== 0)) {
    const minConsecutiveNegativeHours = debouncedNegPeriodRange[0];
    params.set("minConsecutiveNegativeHours", minConsecutiveNegativeHours.toString());
  }
  if (debouncedNegPeriodRange && (debouncedNegPeriodRange[1] !== 24)) {
    const maxConsecutiveNegativeHours = debouncedNegPeriodRange[1];
    params.set("maxConsecutiveNegativeHours", maxConsecutiveNegativeHours.toString());
  }

  params.set("page", pageNumber.toString());
  params.set("size", pageSize.toString());
  params.set("sort", sortBy);

  const searchParams = params.toString();

  return (
    <DSParamsContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        setMinConsumption,
        setMaxConsumption,
        setDebouncedPriceRange,
        setDebouncedNegPeriodRange,
        setPageNumber,
        setPageSize,
        sortBy,
        setSortBy,
        searchParams
      }}
    >
      {children}
    </DSParamsContext.Provider>
  );
}
