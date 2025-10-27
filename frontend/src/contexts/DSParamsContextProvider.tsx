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
  const [debouncedPriceRange, setDebouncedPriceRange] = useState<[number, number] | null>(null);

  const params = new URLSearchParams();

  if (startDate && startDate) {
    params.set("startDate", startDate);
  }
  if (endDate && endDate) {
    params.set("endDate", endDate);
  }

  if (debouncedPriceRange && (debouncedPriceRange[0] !== -18.00 || debouncedPriceRange[1] !== 109.97)) {
    const [minAveragePrice, maxAveragePrice] = debouncedPriceRange;
    params.set("minAveragePrice", minAveragePrice.toString());
    params.set("maxAveragePrice", maxAveragePrice.toString());
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
        setDebouncedPriceRange,
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
