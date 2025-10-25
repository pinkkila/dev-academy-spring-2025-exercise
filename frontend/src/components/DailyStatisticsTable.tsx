import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import type { TDailyData } from "@/lib/types.ts";

export default function DailyStatisticsTable() {
  const [dailyStatistics, setDailyStatistics] = useState<TDailyData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/electricity?startDate=2023-12-01&endDate=2023-12-31&page=0&size=10",
      );
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      const data = await response.json();
      setDailyStatistics(data.content);
    };
    getData();
  }, []);

  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow className="">
          <TableHead className="">Date</TableHead>
          <TableHead>Total Consumption</TableHead>
          <TableHead>Total Production</TableHead>
          <TableHead>Average Price</TableHead>
          <TableHead>Longest negative price period</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          {dailyStatistics.map((dailyData: TDailyData) => (
        <TableRow key={dailyData.date} className="text-muted-foreground">
              <TableCell>{dailyData.date}</TableCell>
              <TableCell>{dailyData.totalConsumption}</TableCell>
              <TableCell>{dailyData.totalProduction}</TableCell>
              <TableCell>{dailyData.averagePrice}</TableCell>
              <TableCell>{dailyData.consecutiveNegativeHours}</TableCell>
        </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
