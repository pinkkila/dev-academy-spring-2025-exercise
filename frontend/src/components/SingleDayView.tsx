import { useState } from "react";
import SingleDayDatePicker from "@/components/SingleDayDatePicker.tsx";
import SingleDayChart from "@/components/SingleDayChart.tsx";
import SingleDayStatistics from "@/components/SingleDayStatistics.tsx";
import { useQuery } from "@tanstack/react-query";
import { getSingleDayData } from "@/lib/queries.ts";
import { finnishDateFormatter, formatLocalDate } from "@/lib/utils.ts";
import { Spinner } from "@/components/ui/spinner.tsx";
import SingleDayStatisticsSkeleton from "@/components/SingleDayStatisticsSkeleton.tsx";

export default function SingleDayView() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const formattedSelectedDay = selectedDay
    ? formatLocalDate(selectedDay)
    : null;

  const { data: singleDayData, isLoading, isError, error } = useQuery({
    queryKey: ["singleDay", formattedSelectedDay],
    queryFn: () => getSingleDayData(formattedSelectedDay),
    enabled: !!formattedSelectedDay,
    staleTime: 60000,
  });

  if (isError) {
    throw new Error(`${error}`);
  }

  return (
    <>
      <h2 className="text-2xl font-bold">
        Single day view
        {singleDayData && (
          <span>
            {" "}
            {finnishDateFormatter.format(new Date(singleDayData.date))}
          </span>
        )}
        {singleDayData && singleDayData.hourlyPrices.length < 24 && (
          <span>*</span>
        )}
      </h2>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6 h-[78.25px]">
          <SingleDayDatePicker
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          {singleDayData && (
            <SingleDayStatistics singleDayData={singleDayData} />
          )}
          {isLoading && (
            <SingleDayStatisticsSkeleton />
          )}
        </div>

        {/* Chart height with margins + span =  713px */}
        <div className="flex flex-col min-h-[713px]">
          {singleDayData && (
            <>
              {singleDayData && singleDayData.hourlyPrices.length < 24 && (
                <span className="text-muted-foreground text-sm ml-auto">
                  * data may be incomplete for this day
                </span>
              )}
              <SingleDayChart
                data={singleDayData.hourlyPrices
                  .slice()
                  .sort(
                    (a, b) => +new Date(a.startTime) - +new Date(b.startTime),
                  )}
              />
            </>
          )}
          {isLoading && (
            <>
              <div className="h-[693px] flex justify-center items-center">
                <Spinner className="size-8" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
