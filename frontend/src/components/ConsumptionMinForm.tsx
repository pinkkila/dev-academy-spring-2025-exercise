import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import * as React from "react";
import { useDSParams } from "@/lib/hooks.ts";

type ConsumptionMinFormProps = {
  schema: z.ZodObject<{ minTotalConsumption: z.ZodString }>;
  setMinValue: (maxValue: number) => void;
}

export default function ConsumptionMinForm({schema, setMinValue}: ConsumptionMinFormProps) {
  const { setMinConsumption } = useDSParams()


  const form = useForm({
    defaultValues: {
      minTotalConsumption: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      setMinValue(parseFloat(value.minTotalConsumption))
      setMinConsumption(value.minTotalConsumption);
    },

  });

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, onChange: (v: string) => void) => {
    const input = e.target.value;

    if (input === "") {
      onChange("");
      return;
    }

    if (/^[0-9]*\.?[0-9]*$/.test(input)) {
      onChange(input);
    }
  };

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
                  <FieldLabel htmlFor={field.name}>Minimum Total Consumption</FieldLabel>
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
