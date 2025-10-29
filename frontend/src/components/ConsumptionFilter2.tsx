import { useState } from "react";
import { MAX_TOTAL_CONSUMPTION_VALUE } from "@/lib/constants.ts";
import NumericFieldForm from "@/components/NumericFieldForm.tsx";
import { useDSParams } from "@/lib/hooks.ts";

export default function ConsumptionFilter2() {
  const [minConsumptionValue, setMinConsumptionValue] = useState<number | null>(
    null,
  );
  const [maxConsumptionValue, setMaxConsumptionValue] = useState<number | null>(
    null,
  );
  const { setMinConsumption, setMaxConsumption } = useDSParams();

  return (
    <>
      <NumericFieldForm
        id="minConsumption"
        label="Minimum Total Consumption:"
        placeholder="Minimum"
        setOwnValue={setMinConsumptionValue}
        otherValue={maxConsumptionValue}
        maxAllowed={MAX_TOTAL_CONSUMPTION_VALUE}
        fieldName="minConsumption"
        schemaMod="min"
        setDsParam={setMinConsumption}
      />
      <NumericFieldForm
        id="maxConsumption"
        label="Maximum Total Consumption:"
        placeholder="Maximum"
        setOwnValue={setMaxConsumptionValue}
        otherValue={minConsumptionValue}
        maxAllowed={MAX_TOTAL_CONSUMPTION_VALUE}
        fieldName="maxConsumption"
        schemaMod="max"
        setDsParam={setMaxConsumption}/>
    </>
  );
}
