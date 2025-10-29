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

type ConsumptionMaxFormProps = {
  schema: z.ZodObject<{ maxTotalConsumption: z.ZodString }>;
  setMaxValue: (maxValue: number | null) => void;
}

export default function ConsumptionMaxForm({ schema, setMaxValue }: ConsumptionMaxFormProps) {
  const { setMaxConsumption } = useDSParams()

  const form = useForm({
    defaultValues: {
      maxTotalConsumption: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      setMaxValue(value.maxTotalConsumption === "" ? null : parseFloat(value.maxTotalConsumption));
      setMaxConsumption(value.maxTotalConsumption);
    },
  });

  return (
    <div>
      <form
        id="consumption-filter-form-max"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="maxTotalConsumption"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Maximum Total Consumption:</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    inputMode="decimal"
                    value={field.state.value}
                    onBlur={() => {
                      field.handleBlur()
                      if (field.state.meta.isDirty) {
                        form.handleSubmit();
                      }
                    }}
                    onChange={(e) => handleNumericInput(e, field.handleChange)}
                    aria-invalid={isInvalid}
                    placeholder="Maximum"
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
