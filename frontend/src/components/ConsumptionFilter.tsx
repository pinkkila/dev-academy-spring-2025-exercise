import ConsumptionMinForm from "@/components/ConsumptionMinForm.tsx";
import ConsumptionMaxForm from "@/components/ConsumptionMaxForm.tsx";
import { useMemo, useState } from "react";
import * as z from "zod";

function createMinSchema(maxValue: number | null) {
  return z.object({
    minTotalConsumption: z
      .string()
      .refine((val) => val === "" || /^[0-9]*\.?[0-9]*$/.test(val), {
        message: "Only positive numbers and decimals allowed",
      })
      .refine((val) => val === "" || parseFloat(val) >= 0, {
        message: "No negative numbers allowed",
      })
      .refine((val) => val === "" || parseFloat(val) <= 46586807.351, {
        message: "Must be less than 46586807.351",
      })
      .refine(
        (val) => {
          if (val === "" || maxValue == null) return true;
          return parseFloat(val) < maxValue;
        },
        { message: "Minimum value must be smaller than maximum value" }
      ),
  });
}

function createMaxSchema(minValue: number | null) {
  return z.object({
    maxTotalConsumption: z
      .string()
      .refine((val) => val === "" || /^[0-9]*\.?[0-9]*$/.test(val), {
        message: "Only positive numbers and decimals allowed",
      })
      .refine((val) => val === "" || parseFloat(val) >= 0, {
        message: "No negative numbers allowed",
      })
      .refine((val) => val === "" || parseFloat(val) <= 46586807.351, {
        message: "Must be less than 46586807.351",
      })
      .refine(
        (val) => {
          if (val === "" || minValue == null) return true;
          return parseFloat(val) > minValue;
        },
        { message: "Maximum value must be bigger than minimum value" }
      ),
  });
}

export default function ConsumptionFilter() {
  const [minConsumptionValue, setMinConsumptionValue] = useState<number | null>(null);
  const [maxConsumptionValue, setMaxConsumptionValue] = useState<number | null>(null);

  const minSchema = useMemo(() => createMinSchema(maxConsumptionValue), [maxConsumptionValue]);
  const maxSchema = useMemo(() => createMaxSchema(minConsumptionValue), [minConsumptionValue]);

  return (
    <>
      <ConsumptionMinForm schema={minSchema} setMinValue={setMinConsumptionValue} />
      <ConsumptionMaxForm schema={maxSchema} setMaxValue={setMaxConsumptionValue} />
    </>
  );
}
