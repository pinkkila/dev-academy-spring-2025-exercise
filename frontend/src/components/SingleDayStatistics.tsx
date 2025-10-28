import type { TSingleDayData } from "@/lib/types.ts";
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
import { HourPriceTable } from "@/components/HourPriceTable.tsx";
import { HourPriceColumns } from "@/components/HourPriceColumns.tsx";
import { Button } from "@/components/ui/button.tsx";

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
            {/*<ItemTitle>Cheapest hours</ItemTitle>*/}
            <ItemDescription>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Hourly Prices</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <HourPriceTable
                    columns={HourPriceColumns}
                    data={singleDayData.hourlyPrices}
                  />
                </PopoverContent>
              </Popover>
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>
    </ItemGroup>
  );
}
