import { type ReactNode, useState } from "react";
import { DSParamsContext } from "./ds-params-context";

export default function DSParamsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("date,asc");

  const params = new URLSearchParams();

  params.set("page", pageNumber.toString());
  params.set("size", pageSize.toString());
  params.set("sort", sortBy);

  const searchParams = params.toString();

  return (
    <DSParamsContext.Provider
      value={{
        setPageNumber,
        setPageSize,
        setSortBy,
        searchParams
      }}
    >
      {children}
    </DSParamsContext.Provider>
  );
}
