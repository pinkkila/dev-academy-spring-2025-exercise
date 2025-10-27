import { useEffect, useState } from "react";
import type { TSingleDayData } from "@/lib/types.ts";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  hourlyPrice: {
    label: "Price",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function SingleDayChart() {
  const [singleDayData, setSingleDayData] = useState<TSingleDayData | null>(
    null,
  );

  const formattedHourlyData = singleDayData?.hourlyPrices.map((data) => {
    const date = new Date(data.startTime);
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

    return {
      startTime: formattedDate,
      hourlyPrice: data.hourlyPrice,
    };
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/electricity/day/2023-01-04`,
      );
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      const data: TSingleDayData = await response.json();
      setSingleDayData(data);
    };
    getData();
  }, []);

  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        {/*<BarChart accessibilityLayer data={singleDayData?.hourlyPrices}>*/}
        <BarChart accessibilityLayer data={formattedHourlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="startTime"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            }
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="hourlyPrice" fill="var(--color-hourlyPrice)" radius={4}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
              formatter={(value: number) => value.toFixed(2)}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
