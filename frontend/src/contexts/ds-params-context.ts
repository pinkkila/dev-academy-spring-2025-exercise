import { createContext } from "react";

type DSParamsContext = {
  setDebouncedPriceRange: (debouncedPriceRange: [number, number]) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  searchParams: string;
};

export const DSParamsContext = createContext<DSParamsContext | null>(null);
