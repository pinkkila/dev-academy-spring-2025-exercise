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

type TColumn<T> = {
  key: keyof T;
  label: string;
};

export default function DailyStatisticsTable() {
  const [dailyStatistics, setDailyStatistics] = useState<TDailyData[]>([]);
  const [page, setPage] = useState<TPage | null>(null);
  const { searchParams, sortBy, setSortBy } = useDSParams();
  const columns: TColumn<TDailyData>[] = [
    { key: "date", label: "Date" },
    { key: "totalConsumption", label: "Total Consumption" },
    { key: "totalProduction", label: "Total Production" },
    { key: "averagePrice", label: "Average Price" },
    { key: "consecutiveNegativeHours", label: "Negative Period" },
  ] as const;

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
    <>
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
                {columns.map((col) => (
                  <TableCell key={col.key} className="text-center">
                    {dailyData[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {page && <PageSelector page={page} />}
    </>
  );
}
