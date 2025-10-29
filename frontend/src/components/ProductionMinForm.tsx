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

type ProductionMinFormProps = {
  schema: z.ZodObject<{ minTotalProduction: z.ZodString }>;
  setMinValue: (maxValue: number | null) => void;
};

export default function ProductionMinForm({
  schema,
  setMinValue,
}: ProductionMinFormProps) {
  const { setMinProduction } = useDSParams();

  const form = useForm({
    defaultValues: {
      minTotalProduction: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      setMinValue(
        value.minTotalProduction === ""
          ? null
          : parseFloat(value.minTotalProduction),
      );
      setMinProduction(value.minTotalProduction);
    },
  });

  return (
    <div>
      <form
        id="production-filter-form-min"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="minTotalProduction"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Minimum Production:
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
