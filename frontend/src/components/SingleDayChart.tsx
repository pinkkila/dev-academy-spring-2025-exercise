import type { THourlyPrice } from "@/lib/types.ts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatFullDateTime, formatHour, formatPrice } from "@/lib/utils.ts";

const chartConfig = {
  hourlyPrice: {
    label: "Price",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type Props = {
  data: THourlyPrice[];
};

export default function SingleDayChart({ data }: Props) {

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="startTime"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={formatHour}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${formatPrice(value)} €`}
        />
        <ChartTooltip
          labelFormatter={formatFullDateTime}
          content={
            <ChartTooltipContent
              formatter={(value) => [
                `Price: ${formatPrice(Number(value))} €`
              ]}
            />
          }
        />
        <Bar dataKey="hourlyPrice" fill="var(--color-hourlyPrice)" radius={4}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
            formatter={formatPrice}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
