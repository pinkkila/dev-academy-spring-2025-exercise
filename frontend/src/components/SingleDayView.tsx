import { useEffect, useState } from "react";
import SingleDayDatePicker from "@/components/SingleDayDatePicker.tsx";
import SingleDayChart from "@/components/SingleDayChart.tsx";
import type { TSingleDayData } from "@/lib/types.ts";
import { formatLocalDate } from "@/lib/utils.ts";
import SingleDayStatistics from "@/components/SingleDayStatistics.tsx";

export default function SingleDayView() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [singleDayData, setSingleDayData] = useState<TSingleDayData | null>(
    null,
  );

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/electricity/day/${formatLocalDate(selectedDay)}`,
      );
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      const data: TSingleDayData = await response.json();
      setSingleDayData(data);
    };
    if (selectedDay) getData();
  }, [selectedDay]);

  return (
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

      {singleDayData && <SingleDayChart data={singleDayData.hourlyPrices} />}
    </div>
  );
}
