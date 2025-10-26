import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import type { TDailyData, TDailyDataReponse, TPage } from "@/lib/types.ts";
import PageSelector from "@/components/PageSelector.tsx";
import { useDSParams } from "@/lib/hooks.ts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import * as React from "react";

type TColumn<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
};

const finnishDateFormatter = new Intl.DateTimeFormat("fi-FI");
const columns: TColumn<TDailyData>[] = [
  {
    key: "date",
    label: "Date",
    render: (value) => finnishDateFormatter.format(new Date(value)),
  },
  {
    key: "totalConsumption",
    label: "Total Consumption",
    render: (value) => {
      if (typeof value === "number") return value;
      return "-";
    },
  },
  { key: "totalProduction", label: "Total Production" },
  {
    key: "averagePrice",
    label: "Average Price",
    render: (value) => {
      if (typeof value === "number") return value.toFixed(2);
      return "-";
    },
  },
  { key: "consecutiveNegativeHours", label: "Negative Period" },
] as const;

export default function DailyStatisticsTable() {
  const [dailyStatistics, setDailyStatistics] = useState<TDailyData[]>([]);
  const [page, setPage] = useState<TPage | null>(null);
  const { searchParams, sortBy, setSortBy } = useDSParams();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/electricity?${searchParams}`,
      );
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      const data: TDailyDataReponse = await response.json();
      setDailyStatistics(data.content);
      setPage(data.page);
    };
    getData();
  }, [searchParams]);

  const handleSort = (key: keyof TDailyData) => {
    if (sortBy === `${key},asc`) setSortBy(`${key},desc`);
    else setSortBy(`${key},asc`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="">
              {columns.map((col) => (
                <TableHead key={col.key} className="text-center">
                  <Button
                    variant="ghost"
                    className="hover:underline hover:cursor-pointer"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    {sortBy === `${col.key},asc` && <ChevronDown />}
                    {sortBy === `${col.key},desc` && <ChevronUp />}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dailyStatistics.map((dailyData: TDailyData) => (
              <TableRow
                key={dailyData.date}
                onClick={() => console.log(dailyData.date)}
              >
                {columns.map((col) => {
                  const value = dailyData[col.key];
                  return (
                    <TableCell key={col.key} className="text-center">
                      {col.render ? col.render(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {page && <PageSelector page={page} />}
    </div>
  );
}
