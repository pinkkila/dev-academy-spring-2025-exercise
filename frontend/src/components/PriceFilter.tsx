import { Slider } from "@/components/ui/slider.tsx";
import { useDebounce, useDSParams } from "@/lib/hooks.ts";
import { useEffect, useState } from "react";

export default function PriceFilter() {
  const { setDebouncedPriceRange } = useDSParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([-18, 109.97]);
  const filterDebouncedPriceRange = useDebounce(priceRange, 1000);

  useEffect(() => {
    setDebouncedPriceRange(filterDebouncedPriceRange);
  }, [filterDebouncedPriceRange, setDebouncedPriceRange]);

  return (
    <div>
      <h2>Average Price</h2>
      <div className="flex justify-between mb-4">
        <p className="text-muted-foreground">{priceRange[0].toFixed(2)}</p>
        <p className="text-muted-foreground">{priceRange[1].toFixed(2)}</p>
      </div>
      <Slider
        value={priceRange}
        onValueChange={(value) => setPriceRange(value as [number, number])}
        min={-18}
        max={109.97}
        step={0.5}
        minStepsBetweenThumbs={1}
      />
    </div>
  );
}
