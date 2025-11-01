import {  useState } from "react";
import SingleDayDatePicker from "@/components/SingleDayDatePicker.tsx";
import SingleDayChart from "@/components/SingleDayChart.tsx";
import SingleDayStatistics from "@/components/SingleDayStatistics.tsx";
import { useQuery } from "@tanstack/react-query";
import { getSingleDayData } from "@/lib/queries.ts";
import { formatLocalDate } from "@/lib/utils.ts";

export default function SingleDayView() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const formattedSelectedDay = selectedDay ? formatLocalDate(selectedDay) : null;

  const { data: singleDayData } = useQuery({
    queryKey: ["singleDay", formattedSelectedDay],
    queryFn: () => getSingleDayData(formattedSelectedDay),
    enabled: !!formattedSelectedDay,
  });



  return (
    <>
      <h2 className="text-2xl font-bold">
        Single day view
        <span> {singleDayData?.date} </span>
        {singleDayData && singleDayData.hourlyPrices.length < 24 && (
          <span>*</span>
        )}
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex gap-6">
          <SingleDayDatePicker
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          {singleDayData && (
            <SingleDayStatistics singleDayData={singleDayData} />
          )}
        </div>

        {singleDayData && (
          <div className="flex flex-col gap-2">
            { singleDayData && singleDayData.hourlyPrices.length < 24 && (
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
          </div>
        )}
      </div>
    </>
  );
}
