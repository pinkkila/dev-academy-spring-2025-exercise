import { useMemo, useState } from "react";
import * as z from "zod";
import ProductionMinForm from "@/components/ProductionMinForm.tsx";
import ProductionMaxForm from "@/components/ProductionMaxForm.tsx";

const baseNumericString = z
  .string()
  .refine((val) => val === "" || /^\d+(\.\d+)?$/.test(val), {
    message: "Only positive numbers and decimals allowed",
  })
  .refine((val) => val === "" || parseFloat(val) <= 5828840, {
    message: "Must be less than 239656644.101",
  });


function createMinSchema(maxValue: number | null) {
  return z.object({
    minTotalProduction: baseNumericString.refine(
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
    maxTotalProduction: baseNumericString.refine(
      (val) => {
        if (val === "" || minValue == null) return true;
        return parseFloat(val) > minValue;
      },
      { message: "Maximum value must be bigger than minimum value" }
    ),
  });
}

export default function ProductionFilter() {
  const [minProductionValue, setMinProductionValue] = useState<number | null>(null);
  const [maxProductionValue, setMaxProductionValue] = useState<number | null>(null);

  const minSchema = useMemo(() => createMinSchema(maxProductionValue), [maxProductionValue]);
  const maxSchema = useMemo(() => createMaxSchema(minProductionValue), [minProductionValue]);

  return (
    <>
      <ProductionMinForm schema={minSchema} setMinValue={setMinProductionValue} />
      <ProductionMaxForm schema={maxSchema} setMaxValue={setMaxProductionValue} />
    </>
  );
}
