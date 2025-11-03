import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TDailyData } from "@/lib/types.ts";
import PageSelector from "@/components/PageSelector.tsx";
import { useDSParams } from "@/lib/hooks.ts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { finnishDateFormatter } from "@/lib/utils.ts";
import { useQuery } from "@tanstack/react-query";
import { getDailyData } from "@/lib/queries.ts";
import { Spinner } from "@/components/ui/spinner.tsx";
import PageSelectorSkeleton from "@/components/PageSelectorSkeleton.tsx";

type TColumn<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
};

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
  {
    key: "totalProduction",
    label: "Total Production",
    render: (value) => {
      if (typeof value === "number") return value;
      return "-";
    },
  },
  {
    key: "averagePrice",
    label: "Average Price",
    render: (value) => {
      if (typeof value === "number") return value.toFixed(2);
      return "-";
    },
  },
  {
    key: "consecutiveNegativeHours",
    label: "Negative Period",
    render: (value) => {
      if (typeof value === "number") return value;
      return "-";
    },
  },
] as const;

export default function DailyStatisticsTable() {
  const { searchParams, sortBy, setSortBy } = useDSParams();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getDailyData(searchParams),
    queryKey: ["dailyData", searchParams],
    staleTime: 60000,
  });

  const dailyStatistics = data?.content ?? [];
  const page = data?.page ?? null;

  const handleSort = (key: keyof TDailyData) => {
    if (sortBy === `${key},asc`) setSortBy(`${key},desc`);
    else setSortBy(`${key},asc`);
  };

  if (isError) {
    throw new Error(`${error}`);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-xl border">
        <ScrollArea className="h-[781.5px]">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="">
                {columns.map((col) => (
                  <TableHead key={col.key} className="text-center">
                    <Button
                      variant="ghost"
                      className="hover:underline hover:cursor-pointer relative"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}

                      <span className="w-4 absolute -right-1">
                        {sortBy === `${col.key},asc` && (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        {sortBy === `${col.key},desc` && (
                          <ChevronUp className="h-4 w-4" />
                        )}
                      </span>
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex items-center justify-center h-[724.5px]">
                      <Spinner className="size-8" />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
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
            )}
          </Table>
        </ScrollArea>
      </div>
      {isLoading ? (
        <PageSelectorSkeleton />
      ) : page ? (
        <PageSelector page={page} />
      ) : null}
    </div>
  );
}
