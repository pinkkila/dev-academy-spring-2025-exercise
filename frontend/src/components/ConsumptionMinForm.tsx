import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useDSParams } from "@/lib/hooks.ts";
import { handleNumericInput } from "@/lib/utils.ts";

type ConsumptionMinFormProps = {
  schema: z.ZodObject<{ minTotalConsumption: z.ZodString }>;
  setMinValue: (maxValue: number | null) => void;
};

export default function ConsumptionMinForm({
  schema,
  setMinValue,
}: ConsumptionMinFormProps) {
  const { setMinConsumption } = useDSParams();

  const form = useForm({
    defaultValues: {
      minTotalConsumption: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      setMinValue(value.minTotalConsumption === "" ? null : parseFloat(value.minTotalConsumption));
      setMinConsumption(value.minTotalConsumption);
    },
  });

  return (
    <div>
      <form
        id="consumption-filter-form-min"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="minTotalConsumption"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Minimum Total Consumption
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    inputMode="decimal"
                    value={field.state.value}
                    onBlur={() => {
                      field.handleBlur();
                      if (field.state.meta.isDirty) {
                        form.handleSubmit();
                      }
                    }}
                    onChange={(e) => handleNumericInput(e, field.handleChange)}
                    aria-invalid={isInvalid}
                    placeholder="Minimum"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
