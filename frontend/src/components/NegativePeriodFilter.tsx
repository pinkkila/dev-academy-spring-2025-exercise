import { useDebounce, useDSParams } from "@/lib/hooks.ts";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider.tsx";

export default function NegativePeriodFilter() {
  const { setDebouncedNegPeriodRange } = useDSParams();
  const [negPeriodRange, setNegPeriodRange] = useState<[number, number]>([0, 24]);
  const filteredDebouncedNegPeriodRange = useDebounce(negPeriodRange, 1000);

  useEffect(() => {
    setDebouncedNegPeriodRange(filteredDebouncedNegPeriodRange);
  }, [filteredDebouncedNegPeriodRange, setDebouncedNegPeriodRange]);

  return (
    <div className="space-y-4">
      <h2>Negative Period</h2>
      <div className="flex justify-between">
        <p className={`${negPeriodRange[0] === 0 && "text-muted-foreground"}`}>{negPeriodRange[0]}</p>
        <p className={`${negPeriodRange[1] === 24 && "text-muted-foreground"}`}>{negPeriodRange[1]}</p>
      </div>
      <Slider
        value={negPeriodRange}
        onValueChange={(value) => setNegPeriodRange(value as [number, number])}
        min={0}
        max={24}
        step={1}
        minStepsBetweenThumbs={1}
      />
    </div>
  );
}
