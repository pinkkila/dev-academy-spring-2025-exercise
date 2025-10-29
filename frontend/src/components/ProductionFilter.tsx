import { useMemo, useState } from "react";
import ProductionMinForm from "@/components/ProductionMinForm.tsx";
import ProductionMaxForm from "@/components/ProductionMaxForm.tsx";
import { MAX_TOTAL_PRODUCION_VALUE } from "@/lib/constants.ts";
import { createMaxSchema, createMinSchema } from "@/lib/utils.ts";

export default function ProductionFilter() {
  const [minProductionValue, setMinProductionValue] = useState<number | null>(null);
  const [maxProductionValue, setMaxProductionValue] = useState<number | null>(null);

  const minSchema = useMemo(() => createMinSchema("minTotalProduction", maxProductionValue, MAX_TOTAL_PRODUCION_VALUE), [maxProductionValue]);
  const maxSchema = useMemo(() => createMaxSchema("maxTotalProduction", minProductionValue, MAX_TOTAL_PRODUCION_VALUE), [minProductionValue]);

  return (
    <>
      <ProductionMinForm schema={minSchema} setMinValue={setMinProductionValue} />
      <ProductionMaxForm schema={maxSchema} setMaxValue={setMaxProductionValue} />
    </>
  );
}
