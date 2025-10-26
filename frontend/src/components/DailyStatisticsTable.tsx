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


export default function DailyStatisticsTable() {
  const [dailyStatistics, setDailyStatistics] = useState<TDailyData[]>([]);
  const [page, setPage] = useState<TPage | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/electricity?startDate=2023-12-01&endDate=2023-12-31&page=0&size=10",
      );
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      const data: TDailyDataReponse = await response.json();
      setDailyStatistics(data.content);
      setPage(data.page);
    };
    getData();
  }, []);

  return (

    <>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="">
              <TableHead className="text-center">Date </TableHead>
              <TableHead className="text-center">Total Consumption</TableHead>
              <TableHead className="text-center">Total Production</TableHead>
              <TableHead className="text-center">Average Price</TableHead>
              <TableHead className="text-center">Negative Period</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dailyStatistics.map((dailyData: TDailyData) => (
              <TableRow
                key={dailyData.date}
                onClick={() => console.log(dailyData.date)}
              >
                <TableCell className="text-center">{dailyData.date}</TableCell>
                <TableCell className="text-center">
                  {dailyData.totalConsumption}
                </TableCell>
                <TableCell className="text-center">
                  {dailyData.totalProduction}
                </TableCell>
                <TableCell className="text-center">
                  {dailyData.averagePrice}
                </TableCell>
                <TableCell className="text-center">
                  {dailyData.consecutiveNegativeHours}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      { page &&
      <PageSelector page={page} />
        }
    </>
  );
}
