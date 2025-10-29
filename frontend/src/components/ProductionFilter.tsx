import { useState } from "react";
import {
  MAX_TOTAL_CONSUMPTION_VALUE,
  MAX_TOTAL_PRODUCION_VALUE,
} from "@/lib/constants.ts";
import NumericFieldForm from "@/components/NumericFieldForm.tsx";
import { useDSParams } from "@/lib/hooks.ts";

export default function ProductionFilter() {
  const [minProductionValue, setMinProductionValue] = useState<number | null>(
    null,
  );
  const [maxProductionValue, setMaxProductionValue] = useState<number | null>(
    null,
  );
  const { setMinProduction, setMaxProduction } = useDSParams();

  return (
    <>
      <NumericFieldForm
        id="minProduction"
        label="Minimum Total Production:"
        placeholder="Minimum"
        setOwnValue={setMinProductionValue}
        otherValue={maxProductionValue}
        maxAllowed={MAX_TOTAL_PRODUCION_VALUE}
        fieldName="minProduction"
        schemaMod="min"
        setDsParam={setMinProduction}
      />
      <NumericFieldForm
        id="maxProduction"
        label="Maximum Total Production"
        placeholder="Maximum"
        setOwnValue={setMaxProductionValue}
        otherValue={minProductionValue}
        maxAllowed={MAX_TOTAL_CONSUMPTION_VALUE}
        fieldName="maxProduction"
        schemaMod="max"
        setDsParam={setMaxProduction}
      />
    </>
  );
}
