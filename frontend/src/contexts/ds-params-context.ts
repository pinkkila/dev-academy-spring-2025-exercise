import { createContext } from "react";

type DSParamsContext = {
  startDate: string | null;
  setStartDate: (startDate: string) => void;
  endDate: string | null;
  setEndDate: (endDate: string) => void;
  setMinConsumption: (minConsumption: string) => void;
  setMaxConsumption: (maxConsumption: string) => void;
  setMinProduction: (minProduction: string) => void;
  setMaxProduction: (maxProduction: string) => void;
  setDebouncedPriceRange: (debouncedPriceRange: [number, number]) => void;
  setDebouncedNegPeriodRange: (debouncedNegPeriodRange: [number, number]) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  searchParams: string;
};

export const DSParamsContext = createContext<DSParamsContext | null>(null);
