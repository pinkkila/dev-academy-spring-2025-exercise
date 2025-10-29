import ConsumptionMinForm from "@/components/ConsumptionMinForm.tsx";
import ConsumptionMaxForm from "@/components/ConsumptionMaxForm.tsx";
import { useMemo, useState } from "react";
import { createMaxSchema, createMinSchema } from "@/lib/utils.ts";
import { MAX_TOTAL_CONSUMPTION_VALUE } from "@/lib/constants.ts";

export default function ConsumptionFilter() {
  const [minConsumptionValue, setMinConsumptionValue] = useState<number | null>(null);
  const [maxConsumptionValue, setMaxConsumptionValue] = useState<number | null>(null);

  const minSchema = useMemo(() => createMinSchema("minTotalConsumption", maxConsumptionValue, MAX_TOTAL_CONSUMPTION_VALUE), [maxConsumptionValue]);
  const maxSchema = useMemo(() => createMaxSchema("maxTotalConsumption", minConsumptionValue, MAX_TOTAL_CONSUMPTION_VALUE), [minConsumptionValue]);

  return (
    <>
      <ConsumptionMinForm schema={minSchema} setMinValue={setMinConsumptionValue} />
      <ConsumptionMaxForm schema={maxSchema} setMaxValue={setMaxConsumptionValue} />
    </>
  );
}
