import { createContext } from "react";

type DSParamsContext = {
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setSortBy: (sortBy: string) => void;
  searchParams: string;
};

export const DSParamsContext = createContext<DSParamsContext | null>(null);
