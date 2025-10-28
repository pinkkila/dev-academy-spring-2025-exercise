import type { THourlyPrice, TSingleDayData } from "@/lib/types.ts";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";

type SingleDayStatisticsProps = {
  singleDayData: TSingleDayData;
};

export default function SingleDayStatistics({
  singleDayData,
}: SingleDayStatisticsProps) {
  return (
    <ItemGroup>
      <div className="flex">
        <Item>
          <ItemContent>
            <ItemTitle>Total Consumption</ItemTitle>
            <ItemDescription>{singleDayData.totalConsumption}</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Total Production</ItemTitle>
            <ItemDescription>{singleDayData.totalProduction}</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Average Price</ItemTitle>
            <ItemDescription>{singleDayData.averagePrice}</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Most Consumptioin vs Production</ItemTitle>
            <ItemDescription>
              {singleDayData.hourWithMostConsumptionVsProduction}
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Cheapest hours</ItemTitle>
            <ItemDescription>
              <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                  <ul>
                    {sortAndFormatCheapestHours(singleDayData.hourlyPrices).map( hour => (
                      <li key={hour.time}>
                        {hour.time}: {hour.price} €
                      </li>
                      )
                    )}
                  </ul>
                </PopoverContent>
              </Popover>
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>
    </ItemGroup>
  );
}

const formatHour = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatPrice = (value: number): string => value.toFixed(2);

function sortAndFormatCheapestHours(hours: THourlyPrice[]) {
  const sortedHours = [...hours].sort((a, b) => a.hourlyPrice - b.hourlyPrice);

  return sortedHours.map((hour) => {
    const formattedTime = formatHour(hour.startTime);
    return {
      time: formattedTime,
      price: formatPrice(hour.hourlyPrice)
    };
  });
}
